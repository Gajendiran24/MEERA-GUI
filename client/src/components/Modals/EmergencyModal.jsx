import { motion } from "framer-motion";
import { FaPhoneAlt } from "react-icons/fa";

const EmergencyModal = ({ onClose }) => {

    const handleBackdropClick = (e) => {
        // Close only if clicked on the backdrop, not the modal content
        if (e.target.id === "backdrop") {
            onClose();
        }
    };

    return (
        <div
            id="backdrop"
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white p-6 rounded-xl shadow-lg min-w-80 text-center"
            >
                <h2 className="text-2xl font-bold text-red-600 mb-4">🚨 Emergency Alert</h2>
                <p className="text-gray-700 mb-4">We are alerting your caretaker & doctor. Please remain calm.</p>

                <div className="flex items-center justify-center text-3xl mb-4 text-red-500">
                    <FaPhoneAlt className="animate-ping-slow" />
                </div>

                <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition cursor-pointer mt-4"
                    onClick={onClose}
                >
                    Close
                </button>
            </motion.div>
        </div>
    );
};

export default EmergencyModal;