import mongoose from "mongoose";

const serviceProviderSchema = new mongoose.Schema({
  providerName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: [String],
  },
  shortDescription: {
    type: String,
    required: true,
  },
  fullDescription: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  workingDays: {
    type: [String],
  },
  openingTime: {
    type: String,
  },
  closingTime: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

export default mongoose.model("ServiceProvider", serviceProviderSchema);
