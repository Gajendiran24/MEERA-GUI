import mongoose from "mongoose";

const memorySchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: String,
        audioUrl: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("Memory", memorySchema);