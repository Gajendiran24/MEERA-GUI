import { useEffect, useRef } from "react";

const useVoiceCommands = ({ listening, onCommand }) => {
    const recognitionRef = useRef(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn("Speech Recognition not supported.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-IN";
        recognition.continuous = true;
        recognition.interimResults = false;

        recognition.onstart = () => {
            console.log("🎙️ Voice recognition started");
        };

        recognition.onend = () => {
            console.log("🎙️ Voice recognition stopped");
            if (listening) {
                try {
                    recognition.start(); // auto-restart
                } catch (e) {
                    console.warn("Failed to restart recognition:", e.message);
                }
            }
        };

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
            console.log("🗣️ Voice command:", transcript);

            if (transcript.includes("play bhajans")) onCommand("play-bhajans");
            else if (transcript.includes("open memory")) onCommand("open-memory");
            else if (transcript.includes("open caretaker")) onCommand("open-caretaker");
        };

        recognitionRef.current = recognition;

        return () => {
            recognition.stop();
        };
    }, [onCommand]);

    useEffect(() => {
        const recognition = recognitionRef.current;
        if (!recognition) return;

        if (listening) {
            try {
                recognition.start();
            } catch (e) {
                console.warn("Recognition already started or error:", e.message);
            }
        } else {
            recognition.stop();
        }
    }, [listening]);
};

export default useVoiceCommands;