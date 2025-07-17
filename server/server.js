import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // to serve multer uploads if needed

// Routes
app.use("/api/auth", authRoutes);

// Connect to DB and start server
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT || 5000, () =>
    console.log("Server running ✅")
  );
});

import memoryRoutes from "./routes/memoryRoutes.js";
app.use("/api/memories", memoryRoutes);