import React, { useState } from "react";
import Step1Role from "./steps/Step1Role";
import Step2Basic from "./steps/Step2Basic";
import Step3Contact from "./steps/Step3Contact";
import Step4Extra from "./steps/Step4Extra";
import Step5HealthInfo from "./Steps/Step5HealthInfo";
import Step6Review from "./Steps/Step6Review";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const RegisterStepper = () => {
    const { i18n } = useTranslation();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        role: "user",
        name: "",
        email: "",
        password: "",
        phone: "",
        dob: "",
        address: "",
        language: "",
        voicePreference: "",
        emergencyContact: "",
        caretakerType: "",
        salary: "",
        timing: "",
        specialty: "",
        experience: "",
        document: null,
        medicalConditions: "",
        currentMedications: ""
    });

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    // Dynamically define steps
    const getSteps = () => {
        const baseSteps = {
            1: <Step1Role formData={formData} onChange={handleChange} next={nextStep} />,
            2: <Step2Basic formData={formData} onChange={handleChange} next={nextStep} prev={prevStep} />,
            3: <Step3Contact formData={formData} onChange={handleChange} next={nextStep} prev={prevStep} />,
            4: <Step4Extra formData={formData} onChange={handleChange} next={nextStep} prev={prevStep} />,
        };

        if (formData.role === "user") {
            baseSteps[5] = <Step5HealthInfo formData={formData} onChange={handleChange} next={nextStep} prev={prevStep} />;
            baseSteps[6] = <Step6Review formData={formData} prev={prevStep} />;
        } else {
            baseSteps[5] = <Step6Review formData={formData} prev={prevStep} />;
        }

        return baseSteps;
    };

    const steps = getSteps();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 via-indigo-900 to-gray-900 p-4 text-white"
        >
            <div className="absolute top-4 right-4">
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
            <h1 className="text-3xl font-bold mb-6 text-white">Register on CareConnect</h1>
            <div className="w-full max-w-xl bg-gray-800 p-6 rounded-2xl shadow-2xl">
                <div className="w-full h-2 bg-gray-700 rounded mb-6">
                    <div
                        className={`h-2 bg-indigo-400 rounded transition-all duration-300`}
                        style={{
                            width: `${formData.role === "user"
                                ? (step / 6) * 100
                                : (step / 5) * 100
                                }%`,
                        }}
                    />
                </div>
                {steps[step]}
            </div>
        </motion.div>
    );
};

export default RegisterStepper;