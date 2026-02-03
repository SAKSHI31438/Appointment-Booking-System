import express from "express";
import {
  getServiceProviderById,
  getServiceProviders,
  registerServiceProvider,
} from "../controllers/serviceProvider-controller.js";

const router = express.Router();

router.post("/registerProvider", registerServiceProvider);
router.get("/getAllProviders", getServiceProviders);
router.get("/getProviderById/:id", getServiceProviderById);

export default router;
