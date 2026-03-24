import ServiceProviderModel from "../models/ServiceProvider-Model.js";
import jwt from "jsonwebtoken";

export const registerServiceProvider = async (req, res) => {
  try {
    const {
      providerName,
      category,
      subCategory,
      shortDescription,
      fullDescription,
      phoneNumber,
      email,
      website,
      address,
      city,
      state,
      pincode,
      workingDays,
      openingTime,
      closingTime,
    } = req.body;

    if (
      !phoneNumber ||
      !email ||
      !providerName ||
      !category ||
      !shortDescription ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    const existingProvider = await ServiceProviderModel.findOne({
      providerName,
      phoneNumber,
    });
    if (existingProvider) {
      return res.status(400).json({
        message:
          "Service provider with this Name & Phone Number already exists",
      });
    }
    const newProvider = await ServiceProviderModel.create({
      providerName,
      category,
      subCategory,
      shortDescription,
      fullDescription,
      phoneNumber,
      email,
      website,
      address,
      city,
      state,
      pincode,
      workingDays,
      openingTime,
      closingTime,
    });
    return res.status(200).json({
      message: "Service provider registered successfully",
      data: newProvider,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getServiceProviders = async (req, res) => {
  try {
    const provider = await ServiceProviderModel.find();
    if (provider.length === 0) {
      return res.json({
        msg: "No provider found",
      });
    }
    return res.json({
      data: provider,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      msg: "error",
    });
  }
};

export const getServiceProviderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Provider ID is required",
      });
    }

    const provider = await ServiceProviderModel.findById(id);

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Service provider not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service provider fetched successfully",
      data: provider,
    });
  } catch (error) {
    console.error("getServiceProviderById error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const editServiceProvider = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: " Provider Id is required" });
  }
  const {
    providerName,
    category,
    subCategory,
    shortDescription,
    fullDescription,
    phoneNumber,
    email,
    website,
    address,
    city,
    state,
    pincode,
    workingDays,
    openingTime,
    closingTime,
  } = req.body;

  try {
    const updatedProvider = await ServiceProviderModel.findByIdAndUpdate(id, {
      providerName,
      category,
      subCategory,
      shortDescription,
      fullDescription,
      phoneNumber,
      email,
      website,
      address,
      city,
      state,
      pincode,
      workingDays,
      openingTime,
      closingTime,
    });
    if (!updatedProvider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    return res.json({
      message: "Provider details Updated",
      data: updatedProvider,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: " Error" });
  }
};

export const toggleProviderStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const provider = await ServiceProviderModel.findById(id);

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    provider.status = provider.status === "active" ? "inactive" : "active";

    await provider.save();

    return res.json({
      message: "Status updated successfully",
      status: provider.status,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getProviderProfile = async (req, res) => {
  try {
    const provider = await ServiceProviderModel.findOne({
      phoneNumber: req.user.phoneNumber,
    });

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    res.status(200).json(provider);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const protect = (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded; // 🔥 yaha req.user set hota hai
      next();
    } else {
      return res.status(401).json({
        message: "Not authorized, token missing",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
