import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./config/db.js";
import authRoutes from "./routes/auth-routes.js";
import serviceProviderRoutes from "./routes/serviceProvider-routes.js";

dotenv.config();
connect();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/serviceProvider", serviceProviderRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} `);
});
