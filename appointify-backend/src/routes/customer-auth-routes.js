import express from "express";
import {
  getAllCustomers,
  loginCustomer,
  registerCustomer,
} from "../controllers/customer-auth-controller.js";

const router = express.Router();

router.post("/customerRegister", registerCustomer);
router.post("/customerLogin", loginCustomer);
router.get("/allCustomers", getAllCustomers);

export default router;
