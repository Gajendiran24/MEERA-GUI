import { useState } from "react";
import { motion } from "framer-motion";
import { FaVolumeUp, FaBookOpen } from "react-icons/fa";

const stories = [
    {
        title: "The Kind Fox",
        content:
            "Once upon a time in a quiet forest, a fox helped a rabbit find its way home. They became best friends and shared their meals together every day.",
    },
    {
        title: "Brave Little Sparrow",
        content:
            "A little sparrow stood up to a storm to protect her nest. Her courage inspired the whole forest to believe in themselves.",
    },
    {
        title: "Magic Mango Tree",
        content:
            "In a small village, a mango tree granted wishes to children who were kind. The more kindness they spread, the more mangoes it gave.",
    },
];

const StoriesTTS = () => {
    const [speakingIndex, setSpeakingIndex] = useState(null);

    const speak = (text, index) => {
        if (!window.speechSynthesis) {
            alert("Text-to-Speech not supported in this browser.");
            return;
        }

        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = "en-IN";
        utter.rate = 1;
        utter.pitch = 1;

        utter.onstart = () => setSpeakingIndex(index);
        utter.onend = () => setSpeakingIndex(null);

        window.speechSynthesis.cancel(); // Cancel any ongoing speech
        window.speechSynthesis.speak(utter);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-purple-700">
                <FaBookOpen /> Story Time
            </h3>

            <div className="space-y-3">
                {stories.map((story, idx) => (
                    <div
                        key={idx}
                        className="bg-purple-50 border border-purple-200 rounded-lg p-4 shadow-sm transition"
                    >
                        <h4 className="text-lg font-semibold text-purple-800">{story.title}</h4>
                        <p className="text-gray-700 text-sm mt-2">{story.content}</p>

                        <button
                            className="mt-3 bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 transition flex items-center gap-2"
                            onClick={() => speak(story.content, idx)}
                        >
                            <FaVolumeUp />
                            {speakingIndex === idx ? "Speaking..." : "Read Aloud"}
                        </button>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default StoriesTTS;