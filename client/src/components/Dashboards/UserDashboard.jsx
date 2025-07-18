import { useEffect, useState } from "react";
import { FaUserCircle, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { motion } from "framer-motion";
import EmergencyModal from "../Modals/EmergencyModal";
import FeelingUnwellModal from "../Modals/FeelingUnWellModal";
import HappyTimeTabs from "../HappyTime/HappyTimeTabs";
import MemoryBox from "../MemoryBox/MemoryBox";
import PairingGrid from "../User/PairingGrid";
import useIdleLogout from "../../hooks/useIdleLogout";
import { useNavigate } from "react-router-dom";
import useOffline from "../../hooks/useOffline";
import useVoiceCommands from "../../hooks/useVoiceCommands";
import ChatBox from "../Chat/ChatBox";
import Logo from "../../Images/Logo12.png"

const UserDashboard = () => {
    const [dateTime, setDateTime] = useState("");
    const [showEmergencyModal, setShowEmergencyModal] = useState(false);
    const [showUnwellModal, setShowUnwellModal] = useState(false);
    const [activeTab, setActiveTab] = useState("happy");
    const [listening, setListening] = useState(false);
    const [doNotDisturb, setDoNotDisturb] = useState(false);
    const [suggestion, setSuggestion] = useState("");
    const [targetId, setTargetId] = useState(null);

    const [batteryLevel, setBatteryLevel] = useState(null);
    const [charging, setCharging] = useState(null);

    const [vitals, setVitals] = useState({
        heartRate: 105,
        bloodPressure: "150/95",
        temperature: 101,
    });

    const [vitalAlerts, setVitalAlerts] = useState([]);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("meera_user")) || {};

    const isOffline = useOffline();

    useIdleLogout();

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const day = now.toLocaleDateString(undefined, { weekday: "short" });
            const date = now.toLocaleDateString();
            const time = now.toLocaleTimeString();
            setDateTime(`${day} | ${date} | ${time}`);

            localStorage.setItem("emergency_contact", JSON.stringify({
                name: "Dr. Meera Sharma",
                phone: "+91-9876543210"
            }));
        };
        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("meera_token");
        localStorage.removeItem("meera_user");
        localStorage.removeItem("isTrustedDevice");
        localStorage.removeItem("trustedEmail");
        navigate("/login");
    };

    useVoiceCommands({
        listening,
        onCommand: (cmd) => {
            if (cmd === "play-bhajans") {
                alert("🎵 Playing bhajans (demo)");
            } else if (cmd === "open-memory") {
                setActiveTab("memory");
            } else if (cmd === "open-caretaker") {
                setActiveTab("pairing");
            }
        },
    });

    const suggestions = [
        "Take deep breaths and relax 🌬️",
        "Drink some water 💧",
        "Stretch your arms and legs 🧘‍♀️",
        "Close your eyes for 30 seconds 🧘",
        "Smile — it's good for your mood 😊"
    ];

    const handleAIClick = () => {
        const random = suggestions[Math.floor(Math.random() * suggestions.length)];
        setSuggestion(random);
    };

    useEffect(() => {
        const alerts = [];

        // Check if heart rate is too high
        if (vitals.heartRate > 100) {
            alerts.push("🚨 High Heart Rate: " + vitals.heartRate + " bpm");
        }

        // Check if blood pressure is too high
        const [systolic, diastolic] = vitals.bloodPressure.split("/").map(Number);
        if (systolic > 140 || diastolic > 90) {
            alerts.push("⚠️ High Blood Pressure: " + vitals.bloodPressure);
        }

        // Check if user has fever
        if (vitals.temperature > 100.4) {
            alerts.push("🌡️ Fever Detected: " + vitals.temperature + "°F");
        }

        // Save to state
        setVitalAlerts(alerts);
    }, [vitals]);

    useEffect(() => {
        navigator.getBattery().then((battery) => {
            const updateBatteryInfo = () => {
                setBatteryLevel(Math.round(battery.level * 100));
                setCharging(battery.charging);
            };

            updateBatteryInfo();

            battery.addEventListener("levelchange", updateBatteryInfo);
            battery.addEventListener("chargingchange", updateBatteryInfo);
        });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden relative">

            {isOffline && (
                <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-[100]">
                    You’re currently offline. Emergency contact available.
                </div>
            )}

            {/* Top Navbar */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="sticky top-0 z-50 bg-[#030b1d] text-white flex items-center justify-between px-6 py-3 shadow-md"
            >
                <div className="text-xl font-bold text-purple-300">
                    <img
                        className="h-14"
                        src={Logo} alt=""
                    />
                </div>
                <div className="flex items-center gap-4">
                    <button
                        className="bg-indigo-500 text-white px-3 py-1 rounded shadow hover:bg-indigo-600 transition cursor-pointer"
                        onClick={handleAIClick}
                    >
                        💡 Suggestion
                    </button>

                    <button
                        className="bg-red-600 text-white px-3 py-1 rounded shadow hover:bg-red-700 transition"
                        onClick={() => setShowEmergencyModal(true)}
                    >
                        EMERGENCY
                    </button>
                    <div className="text-sm text-gray-300">{dateTime}</div>

                    {/* Mic Button */}
                    {!doNotDisturb && (
                        <button
                            onClick={() => setListening(!listening)}
                            className={`text-2xl transition transform hover:scale-110 cursor-pointer ${listening ? "text-green-400 animate-pulse" : "text-white"}`}
                            title="Toggle Voice Assistant"
                        >
                            {listening ? <FaMicrophone /> : <FaMicrophoneSlash />}
                        </button>
                    )}

                    <button
                        onClick={() => setDoNotDisturb(!doNotDisturb)}
                        className={`text-sm px-3 py-1 rounded-full font-medium transition cursor-pointer ${doNotDisturb ? "bg-red-600 text-white" : "bg-green-500 text-white"}`}
                    >
                        {doNotDisturb ? "DND: ON" : "DND: OFF"}
                    </button>
                    <FaUserCircle className="text-2xl text-white" />
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                            <h2 className="text-xl font-semibold">🔋</h2>
                            <p>{batteryLevel !== null ? `${batteryLevel}%` : "Loading..."}</p>
                        </div>
                        <p>Status: {charging === null ? "Detecting..." : charging ? "Charging⚡" : "Not Charging🔋"}</p>
                    </div>
                    <AiOutlineLogout
                        onClick={handleLogout}
                        className="text-2xl text-white cursor-pointer hover:text-red-400"
                    />
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
                        {["happy", "memory", "pairing", "schedule", "alerts", "chat"].map((tab) => (
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
                                {tab === "chat" && "💬 Chat"}
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
                        {activeTab === "chat" && (
                            <>
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">💬 Chat</h2>

                                {/* Target Selector Buttons (mock) */}
                                <div className="flex gap-4 mb-4">
                                    <button
                                        onClick={() => setTargetId("doctor123")}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                    >
                                        Chat with Doctor
                                    </button>
                                    <button
                                        onClick={() => setTargetId("caretaker456")}
                                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                    >
                                        Chat with Caretaker
                                    </button>
                                </div>

                                {/* Chat Box Component */}
                                {targetId ? (
                                    <ChatBox senderId={user._id} receiverId={targetId} />
                                ) : (
                                    <p className="text-gray-600">Please select a person to chat with.</p>
                                )}
                            </>
                        )}
                    </motion.div>
                </div>

                {/* Alerts Panel */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="sticky top-[56px] w-70 bg-yellow-100 h-[calc(100vh-56px)] p-4 border-l border-yellow-300 shadow-inner"
                >
                    <h3 className="text-lg font-semibold text-yellow-900 mb-3">🔔 Alerts</h3>
                    {vitalAlerts.length > 0 ? (
                        <ul className="list-disc pl-4 space-y-1 text-yellow-900">
                            {vitalAlerts.map((alert, idx) => (
                                <li key={idx}>{alert}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-yellow-800">No current alerts.</p>
                    )}
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

            {suggestion && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed bottom-24 right-6 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-xl z-50"
                >
                    {suggestion}
                </motion.div>
            )}
        </div>
    );
};

export default UserDashboard;