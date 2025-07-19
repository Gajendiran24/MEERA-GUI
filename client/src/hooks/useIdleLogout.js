import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const useIdleLogout = (timeout = 100 * 60 * 1000) => {
    const navigate = useNavigate();
    const timerRef = useRef(null);

    const resetTimer = () => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            localStorage.clear();
            alert("Session expired due to inactivity.");
            navigate("/login"); // 👈 or home, depending on app flow
        }, timeout);
    };

    useEffect(() => {
        const events = ["mousemove", "keydown", "click", "touchstart"];

        events.forEach(event =>
            window.addEventListener(event, resetTimer)
        );

        resetTimer(); // Initialize timer

        return () => {
            clearTimeout(timerRef.current);
            events.forEach(event =>
                window.removeEventListener(event, resetTimer)
            );
        };
    }, []);
};

export default useIdleLogout;