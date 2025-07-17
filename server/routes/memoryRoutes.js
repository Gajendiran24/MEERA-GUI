import express from "express";
import Memory from "../models/Memory.js";

const router = express.Router();

// ✅ POST: Save memory metadata after Cloudinary upload
router.post("/", async (req, res) => {
    try {
        const { title, description, audioUrl } = req.body;

        if (!title || !audioUrl) {
            return res.status(400).json({ message: "Missing title or audio URL" });
        }

        const memory = await Memory.create({
            title,
            description,
            audioUrl,
        });

        res.status(201).json({ message: "Memory saved successfully", memory });
    } catch (err) {
        console.error("Memory upload error:", err);
        res.status(500).json({ message: "Upload failed", error: err.message });
    }
});

// ✅ GET: Fetch all memories (optional filter by user in future)
router.get("/:userId", async (req, res) => {
    try {
        const memories = await Memory.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(memories);
    } catch (err) {
        console.error("Memory fetch error:", err);
        res.status(500).json({ message: "Failed to fetch memories" });
    }
});

export default router;