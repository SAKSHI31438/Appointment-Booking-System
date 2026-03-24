import express from "express";
import {
  editServiceProvider,
  getProviderProfile,
  getServiceProviderById,
  getServiceProviders,
  protect,
  registerServiceProvider,
  toggleProviderStatus,
} from "../controllers/serviceProvider-controller.js";

const router = express.Router();

router.post("/registerProvider", registerServiceProvider);
router.get("/getAllProviders", getServiceProviders);
router.get("/getProviderById/:id", getServiceProviderById);
router.put("/editProvider/:id", editServiceProvider);
router.put("/toggle-status/:id", toggleProviderStatus);

router.get("/ProviderProfile", protect, getProviderProfile);

export default router;
