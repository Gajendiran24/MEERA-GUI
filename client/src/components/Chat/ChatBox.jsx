// src/components/Chat/ChatBox.jsx
import { useEffect, useState } from "react";
import socket from "../socket";

const ChatBox = ({ senderId, receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    // Generate a unique room ID based on sender/receiver
    const roomId = [senderId, receiverId].sort().join("-");

    useEffect(() => {
        socket.emit("joinRoom", { senderId, receiverId });

        const handleReceive = (message) => {
            setMessages((prev) => [...prev, message]);
        };

        socket.on("receive-message", handleReceive); // ✅ correct name

        return () => {
            socket.off("receive-message", handleReceive); // ✅ fix name
            socket.emit("leaveRoom", { senderId, receiverId });
        };
    }, [senderId, receiverId]); // ✅ dependency to avoid double listening
    
    const sendMessage = () => {
        if (!input.trim()) return;

        const message = {
            senderId,
            receiverId,
            content: input,
            timestamp: new Date().toISOString(),
        };

        // Emit & update locally
        socket.emit("sendMessage", message);
        setMessages((prev) => [...prev, message]);
        setInput("");
    };

    return (
        <div className="p-4 bg-white rounded-2xl shadow-xl w-full mx-auto">
            {/* Message Display */}
            <div className="h-64 overflow-y-auto border border-gray-300 rounded-lg p-3 space-y-2 bg-gray-50 scroll-smooth">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`p-3 rounded-xl max-w-[35%] text-sm shadow-sm
                            ${msg.senderId === senderId
                                ? "ml-auto bg-indigo-200 text-right text-black"
                                : "mr-auto bg-gray-200 text-left text-gray-900"
                            }`}
                    >
                        <p>{msg.content}</p>
                        <p className="text-xs text-gray-500 mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="mt-4 flex items-center gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                    onClick={sendMessage}
                    className="px-5 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;