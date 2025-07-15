import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Step5HealthInfo = ({ formData, onChange, prev, next }) => {

    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-xl font-semibold mb-4 text-center text-white">{t("healthInfo")}</h2>

            <div className="space-y-4">
                <textarea
                    name="medicalConditions"
                    placeholder={t("medicalConditions")}
                    className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
                    rows={3}
                    value={formData.medicalConditions}
                    onChange={(e) => onChange("medicalConditions", e.target.value)}
                ></textarea>

                <textarea
                    name="currentMedications"
                    placeholder={t("currentMedications")}
                    className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
                    rows={3}
                    value={formData.currentMedications}
                    onChange={(e) => onChange("currentMedications", e.target.value)}
                ></textarea>
            </div>

            <div className="flex justify-between mt-6">
                <button
                    className="px-6 py-2 bg-gray-400 rounded hover:bg-gray-500 transition cursor-pointer"
                    onClick={prev}
                >
                    {t("back")}
                </button>
                <button
                    className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition cursor-pointer"
                    onClick={next}
                >
                    {t("next")}
                </button>
            </div>
        </motion.div>
    );
};

export default Step5HealthInfo;