import express from "express";
import {
  getServiceProviders,
  registerServiceProvider,
} from "../controllers/serviceProvider-controller.js";

const router = express.Router();

router.post("/registerProvider", registerServiceProvider);
router.get("/getAllProviders", getServiceProviders);

export default router;
