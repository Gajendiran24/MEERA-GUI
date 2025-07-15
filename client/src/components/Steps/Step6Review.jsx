import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Step6Review = ({ formData, prev }) => {
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { t } = useTranslation();

    const sendOtp = async () => {
        try {
            setLoading(true);
            await axios.post("http://localhost:5000/api/auth/send-otp", {
                email: formData.email,
            });
            setOtpSent(true);
            alert("OTP sent to email");
        } catch (err) {
            console.error("OTP Send Error:", err);
            alert("Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const verifyAndSubmit = async () => {
        try {
            setLoading(true);

            // ✅ Step 1: Verify OTP
            const verifyRes = await axios.post("http://localhost:5000/api/auth/verify-otp", {
                email: formData.email,
                otp,
            });

            if (verifyRes.data.message !== "OTP verified successfully") {
                alert("OTP verification failed");
                return;
            }

            // ✅ Step 2: Register
            const formToSend = new FormData();
            for (const key in formData) {
                if (formData[key] !== undefined && formData[key] !== null) {
                    formToSend.append(key, formData[key]);
                }
            }

            await axios.post("http://localhost:5000/api/auth/register", formToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // ✅ Step 3: Auto Login
            const loginRes = await axios.post("http://localhost:5000/api/auth/login", {
                email: formData.email,
                password: formData.password,
            });

            const { token, user } = loginRes.data;
            localStorage.setItem("meera_token", token);
            localStorage.setItem("meera_user", JSON.stringify(user));

            alert("🎉 Registered and Logged In Successfully");

            if (user.role === "user") navigate("/dashboard/user");
            else if (user.role === "caretaker") navigate("/dashboard/caretaker");
            else if (user.role === "doctor") navigate("/dashboard/doctor");
            else navigate("/dashboard");

        } catch (err) {
            console.error("Register/Login Error:", err?.response || err);
            alert(err?.response?.data?.message || "Registration/Login failed ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="py-2"
        >
            <h2 className="text-xl font-semibold mb-4 text-center">{t("review")}</h2>

            <div className="text-sm text-white space-y-2">
                <p><strong>{t("role")}:</strong> {formData.role}</p>
                <p><strong>{t("firstName")}:</strong> {formData.firstName} {formData.lastName}</p>
                <p><strong>{t("email")}:</strong> {formData.email}</p>
                <p><strong>{t("phone")}:</strong> {formData.phone}</p>
                <p><strong>{t("dob")}:</strong> {formData.dob}</p>
                <p><strong>{t("address")}:</strong> {formData.address}</p>

                {formData.role === "user" && (
                    <>
                        <p><strong>{t("voicePreference")}:</strong> {formData.language}</p>
                        <p><strong>{t("voicePreference")}:</strong> {formData.voicePreference}</p>
                        <p><strong>{t("emergencyContact")}:</strong> {formData.emergencyContact}</p>
                        <p><strong>{t("caretakerType")}:</strong> {formData.caretakerType}</p>
                    </>
                )}

                {formData.role === "caretaker" && (
                    <>
                        <p><strong>{t("salary")}:</strong> {formData.salary}</p>
                        <p><strong>{t("timing")}:</strong> {formData.timing}</p>
                        <p><strong>{t("document")}:</strong> {formData.document?.name}</p>
                    </>
                )}

                {formData.role === "doctor" && (
                    <>
                        <p><strong>{t("specialty")}:</strong> {formData.specialty}</p>
                        <p><strong>{t("experience")}:</strong> {formData.experience}</p>
                        <p><strong>{t("document")}:</strong> {formData.document?.name}</p>
                    </>
                )}
            </div>

            {!otpSent ? (
                <button
                    className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    onClick={sendOtp}
                    disabled={loading}
                >
                    {loading ? `${t("sendingOTP")}` : `${t("sendOtp")}`}
                </button>
            ) : (
                <>
                    <input
                        type="text"
                        className="w-full mt-4 p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
                        placeholder={t("enterOtp")}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button
                        className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                        onClick={verifyAndSubmit}
                        disabled={loading}
                    >
                        {loading ? `${t("submit")}` : `${t("verifyOtp")}`}
                    </button>
                </>
            )}

            <div className="mt-4 flex justify-start">
                <button
                    className="text-sm underline text-gray-400 hover:text-white cursor-pointer"
                    onClick={prev}
                >
                    {t("back")}
                </button>
            </div>
        </motion.div>
    );
};

export default Step6Review;