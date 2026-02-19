import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./config/db.js";
import authRoutes from "./routes/auth-routes.js";
import serviceProviderRoutes from "./routes/serviceProvider-routes.js";
import serviceProviderAdminRoutes from "./routes/serviceProviderAdmin-routes.js";
import categoryRoutes from "./routes/category-route.js";
import customerAuthRoutes from "./routes/customer-auth-routes.js";

dotenv.config();
connect();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/customer-auth", customerAuthRoutes);
app.use("/api/serviceProvider", serviceProviderRoutes);
app.use("/api/serviceProviderAdmin", serviceProviderAdminRoutes);
app.use("/api/category", categoryRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} `);
});
