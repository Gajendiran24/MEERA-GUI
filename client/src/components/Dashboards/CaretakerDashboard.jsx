import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineLogout } from "react-icons/ai";
import { FaUserNurse } from "react-icons/fa";
import FileUploader from "../Shared/FileUploader"; // Make sure this exists

const mockRequests = [
    {
        id: 1,
        user: "Sita Rao",
        time: "July 16, 10:00 AM",
        message: "Need help with medicine reminder and morning walk.",
    },
    {
        id: 2,
        user: "Kiran Patel",
        time: "July 16, 2:30 PM",
        message: "Assist with meal prep and water intake monitoring.",
    },
    {
        id: 3,
        user: "Lakshmi Iyer",
        time: "July 17, 9:00 AM",
        message: "Need caretaker for BP checkup and emotional support.",
    },
];

const mockSchedule = [
    {
        id: 1,
        time: "9:00 AM",
        task: "Morning Walk with Lakshmi",
        status: "Completed",
    },
    {
        id: 2,
        time: "11:30 AM",
        task: "BP Check for Kiran",
        status: "Pending",
    },
    {
        id: 3,
        time: "2:00 PM",
        task: "Meal Preparation for Sita",
        status: "Pending",
    },
];

const CaretakerDashboard = () => {
    const [dateTime, setDateTime] = useState("");
    const [activeTab, setActiveTab] = useState("requests");
    const [uploadedUrl, setUploadedUrl] = useState("");

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
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
            {/* Top Navbar */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="sticky top-0 z-50 bg-[#101828] text-white flex items-center justify-between px-6 py-3 shadow-md"
            >
                <div className="text-xl font-bold text-green-300 flex items-center gap-2">
                    <FaUserNurse /> Caretaker Dashboard
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-300">{dateTime}</div>
                    <AiOutlineLogout className="text-2xl hover:text-red-400 cursor-pointer" />
                </div>
            </motion.div>

            <div className="flex">
                {/* Sidebar */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="sticky top-[56px] w-64 bg-[#1E293B] text-white h-[calc(100vh-56px)] shadow-lg p-4 space-y-4"
                >
                    {["requests", "schedule", "reports"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`w-full text-left px-4 py-2 rounded font-semibold transition ${activeTab === tab
                                ? "bg-green-500 text-white"
                                : "bg-gray-700 hover:bg-gray-600"
                                }`}
                        >
                            {tab === "requests" && "📥 Requests"}
                            {tab === "schedule" && "📅 Schedule"}
                            {tab === "reports" && "📤 Upload Reports"}
                        </button>
                    ))}
                </motion.div>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex-1 p-6"
                >
                    {/* Requests Tab */}
                    {activeTab === "requests" && (
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">📥 Incoming Requests</h2>
                            <div className="space-y-4">
                                {mockRequests.map((req) => (
                                    <div
                                        key={req.id}
                                        className="border rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-md transition"
                                    >
                                        <h3 className="text-md font-semibold text-indigo-700">{req.user}</h3>
                                        <p className="text-sm text-gray-500">{req.time}</p>
                                        <p className="text-gray-700 mt-2">{req.message}</p>
                                        <div className="mt-4 flex gap-3">
                                            <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-800 transition cursor-pointer">
                                                Accept
                                            </button>
                                            <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-800 transition cursor-pointer">
                                                Decline
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Schedule Tab */}
                    {activeTab === "schedule" && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white p-6 rounded-xl shadow-lg"
                        >
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">📅 Today's Schedule</h2>
                            <div className="space-y-4">
                                {mockSchedule.map((item) => (
                                    <div
                                        key={item.id}
                                        className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="text-md font-semibold text-indigo-700">{item.task}</h3>
                                                <p className="text-sm text-gray-500">{item.time}</p>
                                            </div>
                                            <span
                                                className={`px-3 py-1 text-sm rounded-full ${item.status === "Completed"
                                                    ? "bg-green-200 text-green-800"
                                                    : "bg-yellow-200 text-yellow-800"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Reports Upload Tab */}
                    {activeTab === "reports" && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white p-6 rounded-xl shadow-lg"
                        >
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">📤 Upload Reports</h2>
                            <FileUploader onUploaded={(url) => setUploadedUrl(url)} />
                            {uploadedUrl && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600">✅ Uploaded:</p>
                                    <a
                                        href={uploadedUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline break-words"
                                    >
                                        {uploadedUrl}
                                    </a>
                                </div>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default CaretakerDashboard;