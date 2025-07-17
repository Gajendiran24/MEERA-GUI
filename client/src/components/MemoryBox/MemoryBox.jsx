import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const MemoryBox = () => {
    const [recording, setRecording] = useState(false);
    const [audioURL, setAudioURL] = useState("");
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [shareLink, setShareLink] = useState("");
    const [blob, setBlob] = useState(null);

    const chunksRef = useRef([]);

    const handleRecord = async () => {
        if (!recording) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const recorder = new MediaRecorder(stream);
                recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
                recorder.onstop = () => {
                    const audioBlob = new Blob(chunksRef.current, { type: "audio/mp3" });
                    const url = URL.createObjectURL(audioBlob);
                    setAudioURL(url);
                    setBlob(audioBlob);
                    chunksRef.current = [];
                };
                recorder.start();
                setMediaRecorder(recorder);
                setRecording(true);
            } catch (err) {
                alert("Microphone access denied!");
            }
        } else {
            mediaRecorder.stop();
            setRecording(false);
        }
    };

    const handleSave = async () => {
        if (!title || !blob) return alert("Please record and enter a title.");

        try {
            // Step 1: Upload to Cloudinary
            const formData = new FormData();
            formData.append("file", blob);
            formData.append("upload_preset", "meera_unsigned"); // Make sure it's unsigned
            const cloudinaryRes = await axios.post(
                "https://api.cloudinary.com/v1_1/dqljhvaje/upload",
                formData
            );

            const audioCloudURL = cloudinaryRes.data.secure_url;

            // Step 2: Save metadata to your backend
            const memory = {
                title,
                description,
                audioUrl: audioCloudURL,
            };

            const backendRes = await axios.post("http://localhost:5000/api/memories", memory);

            if (backendRes.status === 201) {
                const fakeLink = `https://meera.app/memory/${uuidv4()}`;
                setShareLink(fakeLink);
                alert("Memory saved successfully ✅");
            }
        } catch (error) {
            console.error("Save memory failed", error);
            alert("Error saving memory");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg"
        >
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">🧠 Memory Box</h2>

            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Memory Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded bg-gray-100"
                />
                <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded bg-gray-100"
                    rows={3}
                ></textarea>

                <button
                    onClick={handleRecord}
                    className={`w-full py-2 rounded text-white transition ${recording ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                >
                    {recording ? "Stop Recording" : "Start Recording 🎙️"}
                </button>

                {audioURL && (
                    <audio controls src={audioURL} className="w-full mt-2"></audio>
                )}

                <button
                    onClick={handleSave}
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
                >
                    Save Memory
                </button>

                {shareLink && (
                    <div className="text-green-700 font-medium mt-2">
                        ✅ Memory saved! Share link:{" "}
                        <a href={shareLink} target="_blank" rel="noreferrer" className="underline text-blue-600">
                            {shareLink}
                        </a>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default MemoryBox;