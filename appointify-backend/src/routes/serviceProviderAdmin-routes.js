import express from "express";
import {
  createAdmin,
  getAllAdmins,
  getServiceProviderAdminById,
  removeAdmin,
} from "../controllers/serviceProviderAdmin-controller.js";

const router = express.Router();

router.post("/createAdmin", createAdmin);
router.get("/getAllAdmins", getAllAdmins);
router.delete("/removeAdmin/:id", removeAdmin);
router.get("/getAdminById/:id", getServiceProviderAdminById);

export default router;
