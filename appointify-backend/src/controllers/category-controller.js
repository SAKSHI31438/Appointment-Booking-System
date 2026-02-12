import CategoryModel from "../models/Category-Model.js";

export const createCategory = async (req, res) => {
  try {
    const { category, subCategories } = req.body;
    if (!category) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }
    const existingCategory = await CategoryModel.findOne({
      category,
    });
    if (existingCategory) {
      return res.status(400).json({
        message: "Category with this name already exists",
      });
    }

    const newCategory = CategoryModel.create({
      category,
      subCategories: subCategories || "",
    });
    return res.status(200).json({
      message: "Category Added successfully",
      data: newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const category = await CategoryModel.find();
    if (category.length === 0) {
      return res.json({
        msg: "No category found",
      });
    }
    return res.json({
      data: category,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      msg: "error",
    });
  }
};

export const getAllActiveCategories = async (req, res) => {
  try {
    const category = await CategoryModel.find({ status: "active" });

    if (category.length === 0) {
      return res.json({
        msg: "No active category found",
      });
    }

    return res.json({
      data: category,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      msg: "error",
    });
  }
};

export const editCategory = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: " Category Id is required" });
  }
  const { category, subCategories } = req.body;

  try {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(id, {
      category,
      subCategories,
    });
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.json({
      message: "Category details Updated",
      data: updatedCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: " Error updating category" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    console.error("getCategoryById error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const toggleCategoryStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    category.status = category.status === "active" ? "inactive" : "active";

    await category.save();

    return res.json({
      message: "Status updated successfully",
      status: category.status,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
