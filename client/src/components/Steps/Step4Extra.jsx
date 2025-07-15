import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Step4Extra = ({ formData, onChange, next, prev }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        onChange("document", file);
    };

    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-xl font-semibold mb-4 text-center">{t("additionalInfo")}</h2>

            <div className="space-y-4">
                {formData.role === "user" && (
                    <>
                        <input
                            type="text"
                            name="language"
                            placeholder={t("language")}
                            className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
                            value={formData.language}
                            onChange={(e) => onChange("language", e.target.value)}
                        />
                        <input
                            type="text"
                            name="voicePreference"
                            placeholder={t("voicePreference")}
                            className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
                            value={formData.voicePreference}
                            onChange={(e) => onChange("voicePreference", e.target.value)}
                        />
                        <input
                            type="text"
                            name="emergencyContact"
                            placeholder={t("emergencyContact")}
                            className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
                            value={formData.emergencyContact}
                            onChange={(e) => onChange("emergencyContact", e.target.value)}
                        />
                        <select
                            name="caretakerType"
                            className="w-full p-2 border rounded bg-gray-700 text-white cursor-pointer"
                            value={formData.caretakerType}
                            onChange={(e) => onChange("caretakerType", e.target.value)}
                        >
                            <option value="" className="cursor-pointer">{t("caretakerType")}</option>
                            <option value="full-time" className="cursor-pointer">{t("fullTime")}</option>
                            <option value="part-time" className="cursor-pointer">{t("partTime")}</option>
                            <option value="daily" className="cursor-pointer">{t("daily")}</option>
                        </select>
                    </>
                )}

                {formData.role === "caretaker" && (
                    <>
                        <input
                            type="text"
                            name="salary"
                            placeholder={t("salary")}
                            className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
                            value={formData.salary}
                            onChange={(e) => onChange("salary", e.target.value)}
                        />
                        <input
                            type="text"
                            name="timing"
                            placeholder={t("timing")}
                            className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
                            value={formData.timing}
                            onChange={(e) => onChange("timing", e.target.value)}
                        />
                        <input
                            type="file"
                            accept=".pdf"
                            className="w-full p-2 border rounded bg-gray-700 text-white file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white"
                            onChange={handleFileChange}
                        />
                    </>
                )}

                {formData.role === "doctor" && (
                    <>
                        <input
                            type="text"
                            name="specialty"
                            placeholder={t("specialty")}
                            className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
                            value={formData.specialty}
                            onChange={(e) => onChange("specialty", e.target.value)}
                        />
                        <input
                            type="text"
                            name="experience"
                            placeholder={t("experience")}
                            className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
                            value={formData.experience}
                            onChange={(e) => onChange("experience", e.target.value)}
                        />
                        <input
                            type="file"
                            accept=".pdf"
                            className="w-full p-2 border rounded bg-gray-700 text-white file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white"
                            onChange={handleFileChange}
                        />
                    </>
                )}
            </div>

            <div className="flex justify-between mt-6">
                <button
                    className="px-6 py-2 hover:text-black rounded hover:bg-gray-300 transition cursor-pointer"
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

export default Step4Extra;