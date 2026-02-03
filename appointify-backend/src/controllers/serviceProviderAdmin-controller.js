import ServiceProviderAdminModel from "../models/ServiceProviderAdmin-Model.js";

export const createAdmin = async (req, res) => {
  try {
    const {
      fullName,
      provider,
      dob,
      role,
      email,
      contactNumber,
      address,
      aadharNumber,
    } = req.body;

    if (
      !fullName ||
      !provider ||
      !dob ||
      !role ||
      !email ||
      !contactNumber ||
      !address ||
      !aadharNumber
    ) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const existingAdmin = await ServiceProviderAdminModel.findOne({
      fullName,
      provider,
      contactNumber,
    });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const newAdmin = await ServiceProviderAdminModel.create({
      fullName,
      provider,
      dob,
      role,
      email,
      contactNumber,
      address,
      aadharNumber,
    });

    return res.status(201).json({
      message: "Service provider admin registered successfully",
      data: newAdmin,
    });
  } catch (error) {
    console.log("CREATE ADMIN ERROR 👉", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await ServiceProviderAdminModel.find().populate("provider");
    if (admins.length === 0) {
      return res.json({
        msg: "No admins found",
      });
    }
    return res.json({
      data: admins,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      msg: "error",
    });
  }
};
export const removeAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const removeAdmin = await ServiceProviderAdminModel.findByIdAndDelete(id);
    if (!removeAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.json({ message: "Admin deleted", data: removeAdmin });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: " Error" });
  }
};

export const getServiceProviderAdminById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: " Admin ID is required",
      });
    }

    const admin = await ServiceProviderAdminModel.findById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Service provider admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "admin fetched successfully",
      data: admin,
    });
  } catch (error) {
    console.error("getServiceProviderAdminById error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
