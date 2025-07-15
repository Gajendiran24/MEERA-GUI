import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Step1Role = ({ formData, onChange, next }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const roles = [
        { label: t("user"), value: "user", desc: t("roleUserDesc") || "I need care and support" },
        { label: t("caretaker"), value: "caretaker", desc: t("roleCaretakerDesc") || "I provide care services" },
        { label: t("doctor"), value: "doctor", desc: t("roleDoctorDesc") || "I provide medical care" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-xl font-semibold mb-4 text-center">{t("role")}</h2>

            <div className="space-y-4">
                {roles.map((role) => (
                    <div
                        key={role.value}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition ${formData.role === role.value
                            ? "border-indigo-500 bg-indigo-100 text-black"
                            : "border-gray-300"
                            }`}
                        onClick={() => onChange("role", role.value)}
                    >
                        <h3 className="text-lg font-medium">{role.label}</h3>
                        <p className="text-sm text-gray-500">{role.desc}</p>
                    </div>
                ))}
            </div>

            <div className="flex justify-between mt-6">
                <button
                    className="text-sm underline text-gray-300 hover:text-white tracking-wider underline-offset-2 cursor-pointer"
                    onClick={() => navigate("/login")}
                >
                    {t("alreadyAccount")}
                </button>

                <button
                    className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    onClick={next}
                >
                    {t("next")}
                </button>
            </div>
        </motion.div>
    );
};

export default Step1Role;