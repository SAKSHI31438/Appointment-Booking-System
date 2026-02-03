import CategoryModel from "../models/Category-Model.js";

export const createCategory = async (req, res) => {
  try {
    const { category, subCategories } = req.body;
    if (!category || !subCategories) {
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
      subCategories,
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
