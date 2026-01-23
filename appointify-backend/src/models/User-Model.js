import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: Number,
  },
  role: {
    type: String,
    enum: ["SUPER_ADMIN", "SP_ADMIN", "CUSTOMER"],
    required: true,
  },
});

export default mongoose.model("User", userSchema);
