import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { UserIcon, KeyIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { usePage } from "@inertiajs/react";
import Modal from "@/Components/Modal";

export default function Edit({ mustVerifyEmail, status }) {
    const [tab, setTab] = useState("profile");
    const user = usePage().props.auth.user;
    const [open, setOpen] = useState(true);
    if (!open) return null;
    return (
        <Modal
            show={open}
            maxWidth="2xl"
            closeable
            onClose={() => setOpen(false)}
        >
            <div className="bg-white rounded-xl shadow-lg p-6 relative">
                {/* Tombol Back */}
                <button
                    onClick={() => window.history.back()}
                    className="absolute left-4 top-2 flex items-center gap-1 text-teal-500 hover:text-teal-700 font-semibold text-base z-20"
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back
                </button>
                <div className="flex items-center gap-4 mb-6 mt-2">
                    <div className="bg-teal-500 rounded-full p-2">
                        <UserIcon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-teal-500 mb-1">
                            Profile
                        </h2>
                        <p className="text-gray-400 text-base">
                            {user.name} &bull; {user.email}
                        </p>
                    </div>
                </div>
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setTab("profile")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                            tab === "profile"
                                ? "bg-teal-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-teal-100"
                        }`}
                    >
                        <UserIcon className="h-5 w-5" /> Profile Info
                    </button>
                    <button
                        onClick={() => setTab("password")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                            tab === "password"
                                ? "bg-teal-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-teal-100"
                        }`}
                    >
                        <KeyIcon className="h-5 w-5" /> Change Password
                    </button>
                    <button
                        onClick={() => setTab("delete")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                            tab === "delete"
                                ? "bg-red-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-red-100"
                        }`}
                    >
                        <TrashIcon className="h-5 w-5" /> Delete Account
                    </button>
                </div>
                <div className="mt-4">
                    {tab === "profile" && (
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    )}
                    {tab === "password" && (
                        <UpdatePasswordForm className="max-w-xl" />
                    )}
                    {tab === "delete" && (
                        <DeleteUserForm className="max-w-xl" />
                    )}
                </div>
            </div>
        </Modal>
    );
}
