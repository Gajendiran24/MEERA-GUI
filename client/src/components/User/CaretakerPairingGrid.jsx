import { useState } from "react";
import { motion } from "framer-motion";

const mockCaretakers = [
    {
        id: 1,
        name: "Priya Sharma",
        experience: "2 yrs",
        gender: "Female",
        language: "Telugu",
        availability: "Morning",
    },
    {
        id: 2,
        name: "Ravi Kumar",
        experience: "4 yrs",
        gender: "Male",
        language: "English",
        availability: "Evening",
    },
    {
        id: 3,
        name: "Anjali Mehta",
        experience: "3 yrs",
        gender: "Female",
        language: "Hindi",
        availability: "Full Day",
    },
];

const CaretakerPairingGrid = () => {
    const [filter, setFilter] = useState("all");

    const filteredList = filter === "all"
        ? mockCaretakers
        : mockCaretakers.filter(c => c.availability === filter);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg"
        >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">👫 Caretaker Pairing</h2>

            {/* Filter Buttons */}
            <div className="flex gap-3 mb-4">
                {["all", "Morning", "Evening", "Full Day"].map((time) => (
                    <button
                        key={time}
                        onClick={() => setFilter(time)}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${filter === time
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        {time}
                    </button>
                ))}
            </div>

            {/* Caretaker Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredList.map((c) => (
                    <div key={c.id} className="border p-4 rounded-lg shadow hover:shadow-md bg-gray-50">
                        <h3 className="text-lg font-semibold text-indigo-700">{c.name}</h3>
                        <p className="text-gray-600 text-sm">Experience: {c.experience}</p>
                        <p className="text-gray-600 text-sm">Language: {c.language}</p>
                        <p className="text-gray-600 text-sm">Gender: {c.gender}</p>
                        <p className="text-gray-600 text-sm">Availability: {c.availability}</p>

                        <button className="mt-3 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                            Pair
                        </button>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default CaretakerPairingGrid;