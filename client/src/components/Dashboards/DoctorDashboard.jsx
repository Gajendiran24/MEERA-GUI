import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineLogout } from "react-icons/ai";
import { FaStethoscope } from "react-icons/fa";
import ChatBox from "../Chat/ChatBox";
import Logo from "../../Images/Logo12.png"

const DoctorDashboard = () => {
    const [dateTime, setDateTime] = useState("");
    const [activeTab, setActiveTab] = useState("patients");

    const doctor = JSON.parse(localStorage.getItem("meera_user"));
    const [selectedUserId, setSelectedUserId] = useState(null);

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
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
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
                    {["patients", "careplan", "chat"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`w-full text-left px-4 py-2 rounded font-semibold transition ${activeTab === tab
                                ? "bg-cyan-500 text-white"
                                : "bg-gray-700 hover:bg-gray-600"
                                }`}
                        >
                            {tab === "patients" && "👥 Patients"}
                            {tab === "careplan" && "📝 Care Plan"}
                            {tab === "chat" && "💬 Chat"}
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
                    {activeTab === "patients" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white p-6 rounded-xl shadow-lg"
                        >
                            <h2 className="text-xl font-semibold mb-6 text-gray-800">👥 Patient List</h2>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    {
                                        id: 1,
                                        name: "Sita Rao",
                                        age: 67,
                                        condition: "Diabetes, BP",
                                    },
                                    {
                                        id: 2,
                                        name: "Kiran Patel",
                                        age: 73,
                                        condition: "Post-surgery Recovery",
                                    },
                                    {
                                        id: 3,
                                        name: "Lakshmi Iyer",
                                        age: 70,
                                        condition: "Arthritis, Anxiety",
                                    },
                                ].map((patient) => (
                                    <motion.div
                                        key={patient.id}
                                        whileHover={{ scale: 1.02 }}
                                        className="p-4 border rounded-lg bg-gray-50 shadow hover:shadow-md transition"
                                    >
                                        <h3 className="text-lg font-semibold text-indigo-700">{patient.name}</h3>
                                        <p className="text-gray-600 text-sm mb-1">Age: {patient.age}</p>
                                        <p className="text-gray-600 text-sm mb-3">Condition: {patient.condition}</p>

                                        <div className="flex gap-2">
                                            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 cursor-pointer">
                                                View
                                            </button>
                                            <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 cursor-pointer">
                                                Message
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "careplan" && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white p-6 rounded-xl shadow-lg"
                        >
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">📝 Send Care Plan</h2>

                            <form
                                className="space-y-4"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    alert("Care Plan sent successfully ✅");
                                }}
                            >
                                <div>
                                    <label className="block mb-1 font-medium text-gray-700">Select Patient</label>
                                    <select
                                        className="w-full border p-2 rounded bg-gray-50 text-gray-700"
                                        required
                                    >
                                        <option value="">-- Select --</option>
                                        <option value="sita">Sita Rao</option>
                                        <option value="kiran">Kiran Patel</option>
                                        <option value="lakshmi">Lakshmi Iyer</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium text-gray-700">Care Plan Details</label>
                                    <textarea
                                        rows={5}
                                        className="w-full border p-2 rounded bg-gray-50 text-gray-700"
                                        placeholder="Enter medications, advice, next steps..."
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                                >
                                    Send Care Plan
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {activeTab === "chat" && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white p-6 rounded-xl shadow-lg flex flex-col h-[500px]"
                        >
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">💬 Chat with Patient</h2>

                            <select
                                value={selectedUserId || ""}
                                onChange={(e) => setSelectedUserId(e.target.value)}
                                className="mb-4 border px-3 py-2 rounded"
                            >
                                <option value="">-- Select Patient --</option>
                                <option value="user1_id">Sita Rao</option>
                                <option value="user2_id">Kiran Patel</option>
                                <option value="user3_id">Lakshmi Iyer</option>
                            </select>

                            {selectedUserId ? (
                                <ChatBox senderId={doctor._id} receiverId={selectedUserId} />
                            ) : (
                                <p className="text-gray-600">Please select a patient to start chatting.</p>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default DoctorDashboard;