import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/User-Model.js";
import ProviderUserModel from "../models/ProviderUser-Model.js";
import ServiceProviderModel from "../models/ServiceProvider-Model.js";

dotenv.config();
const JWTS = process.env.JWT_SECRET;

export const loginProvider = async (req, res) => {
  try {
    const { phoneNumber, otp, role } = req.body;

    // basic validation
    if (!phoneNumber || !role) {
      return res.status(400).json({
        message: "Phone number and role are required",
      });
    }

    // find user by phone
    const user = await ServiceProviderModel.findOne({ phoneNumber });

    if (!user) {
      return res.status(403).json({
        message: "provider not Registered",
      });
    }
    // role verification
    if (role != "PROVIDER") {
      return res.status(403).json({
        message: "Unauthorized role access",
      });
    }

    const isProvider = await ProviderUserModel.findOne({ phoneNumber });
    const providerUser = {};
    if (!isProvider) {
      providerUser = await ProviderUserModel.create({
        phoneNumber,
        role,
      });
    }
    // generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: "provider",
        phoneNumber: user.phoneNumber,
      },
      process.env.JWT_SECRET,
    );

    return res.status(200).json({
      message: "Provider Login successful",
      token,
      providerUser,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getAllProviders = async (req, res) => {
  try {
    const providers = await ProviderUserModel.find();
    if (providers.length === 0) {
      return res.json({
        msg: "no providers found",
      });
    }
    return res.json({
      data: providers,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      msg: "error",
    });
  }
};
