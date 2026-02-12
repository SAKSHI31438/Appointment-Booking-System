import express from "express";
import {
  editServiceProvider,
  getServiceProviderById,
  getServiceProviders,
  registerServiceProvider,
  toggleProviderStatus,
} from "../controllers/serviceProvider-controller.js";

const router = express.Router();

router.post("/registerProvider", registerServiceProvider);
router.get("/getAllProviders", getServiceProviders);
router.get("/getProviderById/:id", getServiceProviderById);
router.put("/editProvider/:id", editServiceProvider);
router.put("/toggle-status/:id", toggleProviderStatus);

export default router;
