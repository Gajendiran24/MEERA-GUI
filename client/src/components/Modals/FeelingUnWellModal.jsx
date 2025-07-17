import { motion } from "framer-motion";
import { FaHeartbeat } from "react-icons/fa";

const FeelingUnWellModal = ({ onClose }) => {
    return (
        <div
            id="unwellBackdrop"
            onClick={(e) => e.target.id === "unwellBackdrop" && onClose()}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full text-center"
            >
                <div className="text-4xl text-red-500 mb-4 animate-pulse">
                    <FaHeartbeat />
                </div>
                <h2 className="text-xl font-semibold text-red-600 mb-2">Feeling Unwell?</h2>
                <p className="text-gray-700 mb-4">We’ll notify your caretaker and doctor immediately.</p>

                <button
                    className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-800 transition cursor-pointer"
                    onClick={onClose}
                >
                    Send Alert 🚨
                </button>
            </motion.div>
        </div>
    );
};

export default FeelingUnWellModal;