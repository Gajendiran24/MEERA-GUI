import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col justify-center items-center text-center">
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
