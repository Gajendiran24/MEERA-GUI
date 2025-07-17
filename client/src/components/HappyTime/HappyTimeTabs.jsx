import { useState } from "react";
import { motion } from "framer-motion";
import { FaMusic, FaBookOpen, FaGamepad } from "react-icons/fa";
import MusicPlayer from "./MusicPlayer";
import StoriesTTS from "./StoriesTTS";
import GamePlaceholder from "./GamePlaceholder";

const HappyTimeTabs = () => {
    const [activeTab, setActiveTab] = useState("music");

    const tabs = [
        { key: "music", label: "Music", icon: <FaMusic /> },
        { key: "stories", label: "Stories", icon: <FaBookOpen /> },
        { key: "games", label: "Games", icon: <FaGamepad /> },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg min-h-[400px]"
        >
            <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">🎉 Happy Time</h2>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition 
                            ${activeTab === tab.key
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                            }`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div>
                {activeTab === "music" && <MusicPlayer />}
                {activeTab === "stories" && <StoriesTTS />}
                {activeTab === "games" && <GamePlaceholder />}
            </div>
        </motion.div>
    );
};

export default HappyTimeTabs;