import { useEffect, useState } from "react";
import { FaBell, FaUserCircle, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { motion } from "framer-motion";
import EmergencyModal from "../Modals/EmergencyModal";
import FeelingUnwellModal from "../Modals/FeelingUnWellModal";
import HappyTimeTabs from "../HappyTime/HappyTimeTabs";
import MemoryBox from "../MemoryBox/MemoryBox";
import PairingGrid from "../User/PairingGrid"; // ✅ new

const UserDashboard = () => {
    const [dateTime, setDateTime] = useState("");
    const [showEmergencyModal, setShowEmergencyModal] = useState(false);
    const [showUnwellModal, setShowUnwellModal] = useState(false);
    const [activeTab, setActiveTab] = useState("happy");
    const [listening, setListening] = useState(false);

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const day = now.toLocaleDateString(undefined, { weekday: "short" });
            const date = now.toLocaleDateString();
            const time = now.toLocaleTimeString();
            setDateTime(`${day} | ${date} | ${time}`);
        };
        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden relative">
            {/* Top Navbar */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="sticky top-0 z-50 bg-[#101828] text-white flex items-center justify-between px-6 py-3 shadow-md"
            >
                <div className="text-xl font-bold text-purple-300">MEERA 🏠</div>
                <div className="flex items-center gap-4">
                    <button
                        className="bg-red-600 text-white px-3 py-1 rounded shadow hover:bg-red-700 transition"
                        onClick={() => setShowEmergencyModal(true)}
                    >
                        EMERGENCY
                    </button>
                    <div className="text-sm text-gray-300">{dateTime}</div>
                    <button
                        onClick={() => {
                            setListening(!listening);
                            console.log("🎙️ Voice Assistant Toggled:", !listening);
                        }}
                        className={`text-2xl transition transform hover:scale-110 cursor-pointer ${listening ? "text-green-400 animate-pulse" : "text-white"}`}
                        title="Toggle Voice Assistant"
                    >
                        {listening ? <FaMicrophone /> : <FaMicrophoneSlash />}
                    </button>
                    <FaUserCircle className="text-2xl text-white" />
                    <AiOutlineLogout className="text-2xl text-white cursor-pointer hover:text-red-400" />
                </div>
            </motion.div>

            {/* Layout */}
            <div className="flex">
                {/* Sidebar */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="sticky top-[56px] w-64 bg-[#1E293B] text-white h-[calc(100vh-56px)] overflow-y-auto shadow-lg p-4 space-y-6"
                >
                    <div>
                        <h3 className="text-lg font-semibold text-green-400 mb-2">📅 Schedule</h3>
                        <div className="space-y-1">
                            <button className="w-full bg-green-100 text-green-900 px-3 py-2 rounded">Completed</button>
                            <button className="w-full bg-green-100 text-green-900 px-3 py-2 rounded">Upcoming</button>
                            <button className="w-full bg-green-100 text-green-900 px-3 py-2 rounded">Urgent</button>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-yellow-400 mb-2">📞 Communication</h3>
                        <div className="space-y-1">
                            <button className="w-full bg-yellow-100 text-yellow-900 px-3 py-2 rounded">Primary Contact</button>
                            <button className="w-full bg-red-200 text-red-900 px-3 py-2 rounded">Doctor</button>
                            <button className="w-full bg-yellow-100 text-yellow-900 px-3 py-2 rounded">Others</button>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-blue-400 mb-2">🎮 Entertainment</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <button className="bg-blue-100 text-blue-900 px-3 py-2 rounded">News</button>
                            <button className="bg-blue-100 text-blue-900 px-3 py-2 rounded">Music</button>
                            <button className="bg-blue-100 text-blue-900 px-3 py-2 rounded">Videos</button>
                            <button className="bg-blue-100 text-blue-900 px-3 py-2 rounded">Books</button>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-300 mb-2">🏋️ Exercise</h3>
                        <button className="w-full bg-gray-200 text-black px-3 py-2 rounded flex justify-between items-center">
                            Start Now <span>→</span>
                        </button>
                    </div>
                </motion.div>

                {/* Main Content Tabs */}
                <div className="flex-1 p-6 space-y-4">
                    {/* Tabs */}
                    <div className="flex gap-4 mb-4">
                        {["happy", "memory", "pairing", "schedule", "alerts"].map((tab) => (
                            <button
                                key={tab}
                                className={`px-4 py-2 rounded-lg font-semibold capitalize transition cursor-pointer ${activeTab === tab
                                    ? "bg-indigo-600 text-white"
                                    : "bg-gray-300 text-gray-700"
                                    }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab === "happy" && "🎉 Happy Time"}
                                {tab === "memory" && "🧠 Memory Box"}
                                {tab === "pairing" && "👥 Caretaker Pairing"}
                                {tab === "schedule" && "📅 Schedule"}
                                {tab === "alerts" && "🔔 Alerts"}
                            </button>
                        ))}
                    </div>

                    {/* Active Tab Content */}
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-6 rounded-xl shadow-lg min-h-[500px]"
                    >
                        {activeTab === "happy" && (
                            <>
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">🎉 Happy Time</h2>
                                <HappyTimeTabs />
                            </>
                        )}
                        {activeTab === "memory" && (
                            <>
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">🧠 Memory Box</h2>
                                <MemoryBox />
                            </>
                        )}
                        {activeTab === "pairing" && (
                            <>
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">👥 Caretaker Pairing Grid</h2>
                                <PairingGrid />
                            </>
                        )}
                        {activeTab === "schedule" && (
                            <p className="text-gray-600">📅 Your upcoming schedule will appear here soon.</p>
                        )}
                        {activeTab === "alerts" && (
                            <p className="text-gray-600">🔔 No alerts at the moment. Stay tuned!</p>
                        )}
                    </motion.div>
                </div>

                {/* Alerts Panel */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="sticky top-[56px] w-64 bg-yellow-100 h-[calc(100vh-56px)] p-4 border-l border-yellow-300 shadow-inner"
                >
                    <h3 className="text-lg font-semibold text-yellow-900 mb-3">🔔 Alerts</h3>
                    <p className="text-yellow-800">No current alerts.</p>
                </motion.div>
            </div>

            {/* Modals */}
            {showEmergencyModal && <EmergencyModal onClose={() => setShowEmergencyModal(false)} />}
            {showUnwellModal && <FeelingUnwellModal onClose={() => setShowUnwellModal(false)} />}

            {/* Unwell Button */}
            <motion.button
                onClick={() => setShowUnwellModal(true)}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="fixed bottom-6 right-6 bg-red-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-red-800 transition z-50 cursor-pointer"
            >
                😓 Feeling Unwell
            </motion.button>
        </div>
    );
};

export default UserDashboard;