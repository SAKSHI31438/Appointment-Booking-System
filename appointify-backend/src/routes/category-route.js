import express from "express";
import {
  createCategory,
  editCategory,
  getAllActiveCategories,
  getAllCategories,
  getCategoryById,
  toggleCategoryStatus,
} from "../controllers/category-controller.js";

const router = express.Router();

router.post("/createCategory", createCategory);
router.get("/getAllCategories", getAllCategories);
router.put("/toggle-status/:id", toggleCategoryStatus);
router.put("/editCategory/:id", editCategory);
router.get("/getCategoryById/:id", getCategoryById);
router.get("/getAllActiveCategories", getAllActiveCategories);

export default router;
