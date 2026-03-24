import express from "express";
import { getAllUser, loginUser } from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/login", loginUser);

router.get("/allUsers", getAllUser);

export default router;
