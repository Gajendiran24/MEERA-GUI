import { motion } from "framer-motion";
import { FaGamepad, FaPuzzlePiece } from "react-icons/fa";

const GamePlaceholder = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-pink-600">
                <FaGamepad /> Game Zone
            </h3>

            <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 p-6 rounded-xl shadow-xl text-center">
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <FaPuzzlePiece className="text-6xl text-pink-600 mx-auto mb-4 animate-bounce" />
                </motion.div>

                <h4 className="text-lg font-bold text-gray-800 mb-2">
                    Coming Soon: Ludo, Rummy & More!
                </h4>
                <p className="text-gray-600">
                    We're working on bringing fun and interactive games just for you.
                    Stay tuned and come back later to play!
                </p>

                <button
                    className="mt-4 px-5 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
                >
                    Notify Me When Ready
                </button>
            </div>
        </motion.div>
    );
};

export default GamePlaceholder;