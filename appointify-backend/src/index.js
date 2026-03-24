import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./config/db.js";
import authRoutes from "./routes/auth-routes.js";
import serviceProviderRoutes from "./routes/serviceProvider-routes.js";
import serviceProviderAdminRoutes from "./routes/serviceProviderAdmin-routes.js";
import categoryRoutes from "./routes/category-route.js";
import customerAuthRoutes from "./routes/customer-auth-routes.js";
import appointmentRoutes from "./routes/appointment-routes.js";
import providerAuthRoutes from "./routes/provider-auth-routes.js";

import http from "http";
import { Server } from "socket.io";

dotenv.config();
connect();

const app = express();
app.use(express.json());
app.use(cors());

/* ---------------- ROUTES ---------------- */
app.use("/api/auth", authRoutes);
app.use("/api/customer-auth", customerAuthRoutes);
app.use("/api/provider-auth", providerAuthRoutes);
app.use("/api/serviceProvider", serviceProviderRoutes);
app.use("/api/serviceProviderAdmin", serviceProviderAdminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/appointments", appointmentRoutes);

/* ---------------- SOCKET SETUP ---------------- */

// 🔥 HTTP server create kar
const server = http.createServer(app);

// 🔥 Socket.IO attach kar
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// 🔥 connection event
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// 🔥 EXPORT (IMPORTANT)
export { io };

/* ---------------- START SERVER ---------------- */

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
