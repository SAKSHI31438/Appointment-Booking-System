import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/User-Model.js";

dotenv.config();
const JWTS = process.env.JWT_SECRET;

export const loginUser = async (req, res) => {
  try {
    const { phoneNumber, otp, role } = req.body;

    // basic validation
    if (!phoneNumber || !role) {
      return res.status(400).json({
        message: "Phone number and role are required",
      });
    }

    // find user by phone
    const user = await UserModel.findOne({ phoneNumber });

    if (!user) {
      return res.status(403).json({
        message: "User not found",
      });
    }
    // role verification
    if (user.role !== role) {
      return res.status(403).json({
        message: "Unauthorized role access",
      });
    }

    // generate token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
    );

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (users.length === 0) {
      return res.json({
        msg: "no user found",
      });
    }
    return res.json({
      data: users,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      msg: "error",
    });
  }
};
