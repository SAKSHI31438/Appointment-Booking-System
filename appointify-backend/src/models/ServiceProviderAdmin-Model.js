import mongoose from "mongoose";

const serviceProviderAdminSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceProvider",
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
    maxLength: 10,
  },
  address: {
    type: String,
    required: true,
  },
  aadharNumber: {
    type: Number,
    required: true,
    maxLength: 12,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

export default mongoose.model(
  "ServiceProviderAdmin",
  serviceProviderAdminSchema,
);
