import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [trustedDevice, setTrustedDevice] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const isTrusted = localStorage.getItem("isTrustedDevice");
        const savedEmail = localStorage.getItem("trustedEmail");

        if (isTrusted === "true" && savedEmail) {
            setEmail(savedEmail);
            setTrustedDevice(true);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) return alert(t("enterEmailPassword"));

        try {
            setLoading(true);
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });

            const { token, user } = res.data;

            localStorage.setItem("meera_token", token);
            localStorage.setItem("meera_user", JSON.stringify(user));

            // ✅ Store trusted info only if checked
            if (trustedDevice) {
                localStorage.setItem("isTrustedDevice", "true");
                localStorage.setItem("trustedEmail", email);
            } else {
                localStorage.removeItem("isTrustedDevice");
                localStorage.removeItem("trustedEmail");
            }

            alert(t("loginSuccess"));

            // ✅ Clear states after login
            setEmail("");
            setPassword("");
            setTrustedDevice(false);

            // ✅ Role-based redirect
            if (user.role === "user") navigate("/dashboard/user");
            else if (user.role === "caretaker") navigate("/dashboard/caretaker");
            else if (user.role === "doctor") navigate("/dashboard/doctor");
            else navigate("/dashboard");
        } catch (err) {
            console.error(err);
            alert(err?.response?.data?.message || t("loginFailed"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-800 to-gray-700 p-6 relative">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute top-4 right-6 z-50"
            >
                <div className="relative group">
                    <select
                        value={i18n.language}
                        onChange={(e) => i18n.changeLanguage(e.target.value)}
                        className="appearance-none pl-2 pr-8 py-2 rounded-md bg-white text-black shadow-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                    >
                        <option value="en">🌐 English</option>
                        <option value="te">🌐 తెలుగు</option>
                    </select>
                    <div className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500">
                        ▼
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl"
            >
                <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-800">
                    {t("loginTitle")}
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder={t("email")}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder={t("password")}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {/* ✅ Trusted Device Checkbox */}
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={trustedDevice}
                            onChange={(e) => setTrustedDevice(e.target.checked)}
                        />
                        {t("trustedDevice") || "Remember this device (Trusted)"}
                    </label>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
                        disabled={loading}
                    >
                        {loading ? t("loggingIn") : t("login")}
                    </button>
                </form>

                <p className="text-center text-md text-gray-600 mt-6">
                    {t("Donthaveanaccount")}{" "}
                    <span
                        className="text-indigo-700 underline cursor-pointer text-md tracking-wide underline-offset-2"
                        onClick={() => navigate("/register")}
                    >
                        {t("register")}
                    </span>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;