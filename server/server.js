import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes.js";
import memoryRoutes from "./routes/memoryRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 🧠 Socket.io Logic
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ senderId, receiverId }) => {
    const roomId = [senderId, receiverId].sort().join("_");
    socket.join(roomId);
  });

  socket.on("sendMessage", (message) => {
    const roomId = [message.senderId, message.receiverId].sort().join("_");
    io.to(roomId).emit("receive-message", message);
  });

  socket.on("leaveRoom", ({ senderId, receiverId }) => {
    const roomId = [senderId, receiverId].sort().join("_");
    socket.leave(roomId);
  });
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/memories", memoryRoutes);

// MongoDB Connect + Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    server.listen(process.env.PORT || 5000, () =>
      console.log("🚀 Server running on port 5000")
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));