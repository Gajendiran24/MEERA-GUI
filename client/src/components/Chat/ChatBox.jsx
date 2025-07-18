import { useEffect, useState } from "react";
import socket from "../socket";

const ChatBox = ({ senderId, receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        // Join room with unique combination of sender & receiver
        socket.emit("joinRoom", { senderId, receiverId });

        // Listen for incoming messages
        socket.on("receiveMessage", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        // Clean up on unmount
        return () => {
            socket.off("receiveMessage");
            socket.emit("leaveRoom", { senderId, receiverId });
        };
    }, [senderId, receiverId]);

    const sendMessage = () => {
        if (!input.trim()) return;
        const message = {
            senderId,
            receiverId,
            content: input,
            timestamp: new Date(),
        };

        socket.emit("sendMessage", message);
        setMessages((prev) => [...prev, message]);
        setInput("");
    };

    return (
        <div className="p-4 bg-white rounded-2xl shadow-xl max-w-4xl mx-auto">

            {/* Messages Area */}
            <div className="h-72 overflow-y-auto border border-gray-300 rounded-lg p-3 space-y-2 bg-gray-50 scroll-smooth">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`p-3 rounded-xl max-w-[35%] text-sm shadow-sm transition-all duration-200
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

            {/* Input Area */}
            <div className="mt-4 flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                    onClick={sendMessage}
                    className="px-5 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-200 cursor-pointer"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;