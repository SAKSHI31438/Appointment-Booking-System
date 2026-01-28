import ServiceProviderModel from "../models/ServiceProvider-Model.js";

export const registerServiceProvider = async (req, res) => {
  try {
    const {
      providerName,
      category,
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
    const newProvider = ServiceProviderModel.create({
      providerName,
      category,
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
