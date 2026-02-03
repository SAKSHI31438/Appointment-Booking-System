import express from "express";
import {
  createCategory,
  getAllCategories,
} from "../controllers/category-controller.js";

const router = express.Router();

router.post("/createCategory", createCategory);
router.get("/getAllCategories", getAllCategories);

export default router;
