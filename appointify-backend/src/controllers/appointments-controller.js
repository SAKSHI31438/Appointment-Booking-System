import AppointmentsModel from "../models/Appointments-Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/User-Model.js";
import CustomerUserModel from "../models/CustomerUser-Model.js";
import { io } from "../index.js";

dotenv.config();

export const protect = (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded; // 🔥 yaha user set hota hai

      next();
    } else {
      return res.status(401).json({
        message: "Token missing",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      age,
      gender,
      city,
      providerId,
      appointmentDate,
      appointmentTime,
      notes,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !age ||
      !gender ||
      !city ||
      !providerId ||
      !appointmentDate ||
      !appointmentTime
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    let customerId = null;
    let bookedBy = "customer";

    if (req.user?.role === "customer") {
      customerId = req.user.id;
      bookedBy = "customer";
    }

    if (req.user?.role === "provider") {
      bookedBy = "provider";
    }

    // ❌ Double booking check
    const alreadyBooked = await AppointmentsModel.findOne({
      providerId,
      appointmentDate,
      appointmentTime,
      phoneNumber,
    });

    if (alreadyBooked) {
      return res.status(400).json({
        success: false,
        message: "This time slot is already booked",
      });
    }

    const appointment = await AppointmentsModel.create({
      customerId,
      providerId,
      fullName,
      email,
      phoneNumber,
      age,
      gender,
      city,
      appointmentDate,
      appointmentTime,
      notes,
      bookedBy,
    });
    console.log("USER:", req.user);
    console.log("ROLE:", req.user?.role);
    io.emit("newAppointment", appointment);
    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await AppointmentsModel.find().populate([
      { path: "providerId" },
      { path: "customerId" },
    ]);
    if (appointments.length === 0) {
      return res.json({
        msg: "No appointments found",
      });
    }
    return res.json({
      data: appointments,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      msg: "error",
    });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    // Logged in customer ID
    const customerId = req.user.id;
    // const customerId = req.existingUser._id;
    console.log("Customer ID:", customerId);

    const bookings = await AppointmentsModel.find({
      customerId: customerId,
    })
      .populate("providerId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const customerId = req.user.id;

    const appointment = await AppointmentsModel.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (appointment.customerId.toString() !== customerId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this booking",
      });
    }

    if (
      appointment.status === "cancelled" ||
      appointment.status === "rejected"
    ) {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel ${appointment.status} booking`,
      });
    }

    appointment.status = "cancelled";
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getProviderAppointments = async (req, res) => {
  try {
    const providerId = req.user.id; // token se aayega

    const appointments = await AppointmentsModel.find({
      providerId: providerId,
    }).sort({ appointmentDate: -1 });

    res.json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const providerId = req.user.id; // token se provider id

    const appointment = await AppointmentsModel.findOne({
      _id: id,
      providerId: providerId,
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    appointment.status = status;

    await appointment.save();

    res.json({
      success: true,
      message: "Status updated successfully",
      data: appointment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
