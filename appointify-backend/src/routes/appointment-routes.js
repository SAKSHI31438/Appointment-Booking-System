import express from "express";
import {
  cancelBooking,
  createAppointment,
  getAllAppointments,
  getMyBookings,
  getProviderAppointments,
  protect,
  updateAppointmentStatus,
} from "../controllers/appointments-controller.js";

const router = express.Router();

router.post("/createAppointment", protect, createAppointment);
router.get("/getAllAppointments", getAllAppointments);
router.get("/getMyBookings", protect, getMyBookings);
router.patch("/cancel/:id", protect, cancelBooking);
router.get("/provider-appointments", protect, getProviderAppointments);
router.patch("/update-status/:id", protect, updateAppointmentStatus);

export default router;
