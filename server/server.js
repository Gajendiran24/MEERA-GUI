import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded PDFs

app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT || 5000, () =>
    console.log("Server running ✅")
  );
});