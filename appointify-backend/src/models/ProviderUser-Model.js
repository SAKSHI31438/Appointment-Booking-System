import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
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
    enum: ["SUPER_ADMIN", "SP_ADMIN", "CUSTOMER", "PROVIDER"],
    required: true,
  },
});

export default mongoose.model("ProviderUser", providerSchema);
