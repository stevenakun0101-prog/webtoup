// resources/js/Pages/SendMessage.jsx
import React, { useState } from "react";

const SendMessage = () => {
    const [groupTitle, setGroupTitle] = useState("");
    const [message, setMessage] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const handleSendMessage = async (e) => {
        e.preventDefault();

        // Call your backend API to send a message to the group
        try {
            const response = await fetch("http://localhost:3001/send-message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    groupTitle, // Use group title directly
                    message,
                }),
            });

            const data = await response.json();
            setResponseMessage(data.message || "Message sending initiated.");
        } catch (error) {
            console.error("Error sending message:", error);
            setResponseMessage("Error sending message.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-2xl font-semibold text-center mb-6">
                    Send Message to Group
                </h1>
                <form onSubmit={handleSendMessage}>
                    <div className="mb-4">
                        <label
                            htmlFor="groupTitle"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Group Title:
                        </label>
                        <input
                            type="text"
                            id="groupTitle"
                            value={groupTitle}
                            onChange={(e) => setGroupTitle(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Message:
                        </label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Send Message
                    </button>
                </form>
                {responseMessage && (
                    <p className="mt-4 text-center text-gray-600">
                        {responseMessage}
                    </p>
                )}
            </div>
        </div>
    );
};

export default SendMessage;
