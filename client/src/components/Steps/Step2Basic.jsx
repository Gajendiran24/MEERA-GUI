import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Step2Basic = ({ formData, onChange, next, prev }) => {
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleNext = () => {
        if (formData.password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        next();
    };

    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-xl font-semibold mb-4 text-center">{t("basicInfo")}</h2>

            <div className="space-y-4">
                <div className="flex gap-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder={t("firstName")}
                        className="w-1/2 p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
                        value={formData.firstName}
                        onChange={(e) => onChange("firstName", e.target.value)}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder={t("lastName")}
                        className="w-1/2 p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
                        value={formData.lastName}
                        onChange={(e) => onChange("lastName", e.target.value)}
                    />
                </div>

                <input
                    type="email"
                    name="email"
                    placeholder={t("email")}
                    className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
                    value={formData.email}
                    onChange={(e) => onChange("email", e.target.value)}
                />

                <input
                    type="password"
                    name="password"
                    placeholder={t("password")}
                    className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
                    value={formData.password}
                    onChange={(e) => onChange("password", e.target.value)}
                />

                <input
                    type="password"
                    placeholder={t("confirmPassword")}
                    className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <div className="flex justify-between mt-6">
                <button
                    className="px-6 py-2 bg-gray-800 rounded hover:bg-gray-300 hover:text-gray-800 transition cursor-pointer"
                    onClick={prev}
                >
                    {t("back")}
                </button>
                <button
                    className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition cursor-pointer"
                    onClick={handleNext}
                >
                    {t("next")}
                </button>
            </div>
        </motion.div>
    );
};

export default Step2Basic;