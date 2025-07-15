import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Step3Contact = ({ formData, onChange, next, prev }) => {

    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-xl font-semibold mb-4 text-center">{t("contactInfo")}</h2>

            <div className="space-y-4">
                <input
                    type="tel"
                    name="phone"
                    placeholder={t("phone")}
                    className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
                    value={formData.phone}
                    onChange={(e) => onChange("phone", e.target.value)}
                />

                <input
                    type="date"
                    name="dob"
                    className="w-full p-2 border rounded bg-gray-700 text-white"
                    value={formData.dob}
                    onChange={(e) => onChange("dob", e.target.value)}
                />

                <textarea
                    name="address"
                    placeholder={t("address")}
                    className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400"
                    rows="3"
                    value={formData.address}
                    onChange={(e) => onChange("address", e.target.value)}
                ></textarea>
            </div>

            <div className="flex justify-between mt-6">
                <button
                    className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-300 hover:text-gray-800 transition cursor-pointer"
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

export default Step3Contact;