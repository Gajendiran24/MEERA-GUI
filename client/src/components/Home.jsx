import { useNavigate } from "react-router-dom";
import HearLogo from "../Images/Gemini_Generated_Image_nd1a75nd1a75nd1a-removebg-preview.png";
import "../App.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-gradient-to-l from-blue-800 to-blue-100 flex flex-col justify-center items-center text-center overflow-hidden">
            {/* Left Floating Image */}
            <img
                src={HearLogo}
                alt="Heart Left"
                className="absolute left-[14%] top-[55%] transform -translate-y-1/2 animate-pulse-slow h-30"
            />

            {/* Right Floating Image */}
            <img
                src={HearLogo}
                alt="Heart Right"
                className="absolute right-[6%] top-[40%] transform -translate-y-1/2 h-64 animate-pulse-slow"
            />

            <h1 className="text-4xl font-bold mb-8 text-indigo-800">Welcome to CareConnect</h1>
            <div className="space-x-4">
                <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                    Login
                </button>
                <button
                    onClick={() => navigate("/register")}
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Home;
