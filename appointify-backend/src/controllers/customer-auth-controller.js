import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import CustomerUserModel from "../models/CustomerUser-Model.js";
dotenv.config();
const JWTS = process.env.JWT_SECRET;

export const registerCustomer = async (req, res) => {
  const { name, email, phoneNumber, password } = req.body;

  const existingUser = await CustomerUserModel.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedpassword = await bcrypt.hash(password, 10);

  const newUser = await CustomerUserModel.create({
    name,
    email,
    phoneNumber,
    password: hashedpassword,
  });
  return res.json({
    message: "User signed up successfully",
    data: newUser,
  });
};

export const loginCustomer = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await CustomerUserModel.findOne({ email });
  if (!existingUser) {
    return res.status(403).json({
      message: "User does not exists! Sign Up",
    });
  }

  //compare password
  const match = await bcrypt.compare(password, existingUser.password);
  if (!match) {
    return res.status(403).json({
      message: "Invalid credentials",
    });
  }
  const id = existingUser._id;
  const token = jwt.sign({ id }, JWTS);
  return res.json({
    message: "Login succesfully",
    data: existingUser,
    token,
  });
};

export const getAllCustomers = async (req, res) => {
  try {
    const users = await CustomerUserModel.find();
    if (users.length === 0) {
      return res.json({
        msg: "no user found",
      });
    }
    return res.json({
      data: users,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      msg: "error",
    });
  }
};
