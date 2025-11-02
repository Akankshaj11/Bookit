import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import experienceRoutes from "./routes/experienceRoutes";
import bookingRoutes from "./routes/bookingRoutes";

// ✅ Load environment variables first
dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/experiences", experienceRoutes);
app.use("/api/bookings", bookingRoutes);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
