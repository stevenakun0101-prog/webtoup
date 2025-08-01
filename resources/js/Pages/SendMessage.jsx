// resources/js/Pages/SendMessage.jsx
import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

const SendMessage = () => {
    const { data, setData, post, processing, errors } = useForm({
        groupTitle: "",
        message: "",
    });

    const handleSendMessage = (e) => {
        e.preventDefault();
        post("https://wa-web-service.up.railway.app/send-message", {
            onSuccess: (page) => {
                alert(page.props.flash.message || "Message sent successfully!");
                setData({ groupTitle: "", message: "" }); // Clear the form
            },
            onError: (errors) => {
                console.error(errors);
                alert(
                    "Failed to send message: " +
                        (errors.error || "Unknown error")
                );
            },
        });
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
                            value={data.groupTitle}
                            onChange={(e) =>
                                setData("groupTitle", e.target.value)
                            }
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                        />
                        {errors.groupTitle && (
                            <p className="text-red-600">{errors.groupTitle}</p>
                        )}
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
                            value={data.message}
                            onChange={(e) => setData("message", e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                        />
                        {errors.message && (
                            <p className="text-red-600">{errors.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className={`w-full ${
                            processing ? "bg-gray-400" : "bg-blue-600"
                        } text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200`}
                    >
                        {processing ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SendMessage;
