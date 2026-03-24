import express from "express";
import {
  createAdmin,
  editAdmin,
  getAllAdmins,
  getServiceProviderAdminById,
  removeAdmin,
  toggleAdminStatus,
} from "../controllers/serviceProviderAdmin-controller.js";

const router = express.Router();

router.post("/createAdmin", createAdmin);
router.get("/getAllAdmins", getAllAdmins);
router.delete("/removeAdmin/:id", removeAdmin);
router.get("/getAdminById/:id", getServiceProviderAdminById);
router.put("/editAdmin/:id", editAdmin);
router.put("/toggle-status/:id", toggleAdminStatus);

export default router;
