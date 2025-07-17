import { useState } from "react";
import { motion } from "framer-motion";

const caretakers = [
    {
        id: 1,
        name: "Anjali Sharma",
        type: "Full-time",
        salary: "₹25,000",
        timing: "9 AM - 6 PM",
    },
    {
        id: 2,
        name: "Ravi Kumar",
        type: "Part-time",
        salary: "₹12,000",
        timing: "2 PM - 6 PM",
    },
    {
        id: 3,
        name: "Meena Joshi",
        type: "Daily",
        salary: "₹500/day",
        timing: "Flexible",
    },
];

const PairingGrid = () => {
    const [filter, setFilter] = useState("all");

    const filtered = caretakers.filter((c) =>
        filter === "all" ? true : c.type === filter
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg mt-6"
        >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">🧑‍⚕️ Caretaker Pairing</h2>

            {/* Filter Buttons */}
            <div className="flex gap-4 mb-6">
                {["all", "Full-time", "Part-time", "Daily"].map((type) => (
                    <button
                        key={type}
                        className={`px-4 py-2 rounded font-semibold border cursor-pointer ${filter === type
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 text-gray-700"
                            }`}
                        onClick={() => setFilter(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((c) => (
                    <div
                        key={c.id}
                        className="border rounded-lg p-4 bg-indigo-50 shadow-sm hover:shadow-md transition"
                    >
                        <h3 className="text-lg font-bold text-indigo-800">{c.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">
                            <strong>Type:</strong> {c.type}
                        </p>
                        <p className="text-gray-600 text-sm">
                            <strong>Salary:</strong> {c.salary}
                        </p>
                        <p className="text-gray-600 text-sm">
                            <strong>Timing:</strong> {c.timing}
                        </p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default PairingGrid;