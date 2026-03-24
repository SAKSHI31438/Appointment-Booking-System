import express from "express";
import {
  getAllProviders,
  loginProvider,
} from "../controllers/provider-auth-controller.js";

const router = express.Router();

router.post("/login", loginProvider);

router.get("/allProviders", getAllProviders);

export default router;
