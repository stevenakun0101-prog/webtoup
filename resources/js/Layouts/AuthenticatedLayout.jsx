import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    HomeIcon,
    CubeIcon,
    TagIcon,
    ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const isAdmin = user?.role === 1;
    return (
        <div className="min-h-screen bg-gray-900 flex">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-screen w-64 bg-gray-950 border-r border-teal-700 shadow-lg transition-transform duration-200 ease-in-out ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-64"
                } sm:translate-x-0 sm:static sm:inset-auto sm:relative`}
                style={{
                    boxShadow: "2px 0 16px rgba(0,0,0,0.10)",
                    position: "fixed",
                    height: "100vh",
                    left: 0,
                    top: 0,
                }}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between h-16 px-4 border-b border-teal-800">
                        <Link
                            href="/"
                            className="text-teal-400 font-bold text-2xl tracking-tight"
                        >
                            ADMIN
                        </Link>
                        <button
                            className="sm:hidden text-gray-400 hover:text-teal-400"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
                        {isAdmin && (
                            <Link
                                href={route("admin.dashboard")}
                                className="flex items-center px-4 py-2 rounded-lg text-gray-200 hover:bg-teal-700 transition group font-bold"
                            >
                                <HomeIcon className="h-5 w-5 mr-3 text-teal-400 group-hover:text-white" />
                                Admin Dashboard
                            </Link>
                        )}
                        <Link
                            href={route("productsdashboard.index")}
                            className="flex items-center px-4 py-2 rounded-lg text-gray-200 hover:bg-teal-700 transition group"
                        >
                            <CubeIcon className="h-5 w-5 mr-3 text-teal-400 group-hover:text-white" />
                            Products
                        </Link>
                        <Link
                            href={route("categorydashboard.index")}
                            className="flex items-center px-4 py-2 rounded-lg text-gray-200 hover:bg-teal-700 transition group"
                        >
                            <TagIcon className="h-5 w-5 mr-3 text-teal-400 group-hover:text-white" />
                            Categories
                        </Link>
                        <Link
                            href={route("purchase_orders.index")}
                            className="flex items-center px-4 py-2 rounded-lg text-gray-200 hover:bg-teal-700 transition group"
                        >
                            <ClipboardDocumentListIcon className="h-5 w-5 mr-3 text-teal-400 group-hover:text-white" />
                            Purchase Orders
                        </Link>
                        {/* Only show order history for user, not admin */}
                        {user?.role === 0 && (
                            <li>
                                <Link
                                    href="/orders/history"
                                    className="block px-4 py-2 hover:bg-gray-800 rounded transition"
                                >
                                    Riwayat Pesanan
                                </Link>
                            </li>
                        )}
                    </nav>
                    <div className="p-4 border-t border-teal-800 text-gray-400 text-xs">
                        Logged in as{" "}
                        <span className="text-teal-400">{user.name}</span>
                    </div>
                </div>
            </aside>
            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-40 sm:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
            {/* Main content wrapper */}
            <div
                className="flex-1 flex flex-col min-h-screen"
                style={{
                    marginLeft: "0px",
                    paddingLeft: "0px",
                    minHeight: "100vh",
                }}
            >
                {/* Topbar */}
                <nav
                    className="fixed top-0 left-0 right-0 z-40 h-16 border-b border-teal-500 bg-gray-900 flex items-center pl-0 sm:pl-64"
                    style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                >
                    <div className="flex-1 flex items-center justify-end px-4 sm:px-8">
                        <button
                            className="sm:hidden text-gray-400 hover:text-teal-400 mr-4"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                        {/* Dropdown user: username as trigger, logout di dalam */}
                        <div>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent bg-gray-900 px-3 py-2 text-sm font-medium leading-4 text-white transition duration-150 ease-in-out hover:text-gray-300 focus:outline-none"
                                        >
                                            {user.name}
                                            <svg
                                                className="-me-0.5 ms-2 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    {user.role === 0 && (
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                    )}
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </nav>
                {/* Header */}
                {header && (
                    <header
                        className="bg-gray-900 shadow"
                        style={{ marginTop: "4rem" }}
                    >
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                {/* Main content area */}
                <main
                    className="flex-1 p-4 sm:ml-64"
                    style={{ marginTop: header ? "0" : "4rem" }}
                >
                    {children}
                    {/* Floating CS Button - only for user (role 0) */}
                    {user && user.role === 0 && (
                        <a
                            href="https://wa.me/6285157746677?text=Halo%20Admin%20Cungsstore,%20saya%20butuh%20bantuan."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="fixed bottom-6 right-6 z-50 flex items-center group"
                            title="Hubungi CS via WhatsApp"
                        >
                            <div className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl p-5 flex items-center justify-center transition-all duration-200 border-4 border-white group-hover:scale-110 group-active:scale-95">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-8 h-8 drop-shadow"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 12c0 5.385 4.365 9.75 9.75 9.75 1.7 0 3.29-.425 4.68-1.17l3.57 1.02a.75.75 0 00.93-.93l-1.02-3.57A9.708 9.708 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12z"
                                    />
                                </svg>
                                <span className="ml-3 font-bold text-lg hidden sm:inline-block">
                                    Chat CS
                                </span>
                            </div>
                            {/* Tooltip for desktop */}
                            <span className="hidden sm:block absolute right-full mr-4 px-3 py-2 rounded bg-black text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition pointer-events-none z-50">
                                Hubungi Customer Service
                            </span>
                            {/* Badge for mobile */}
                            <span className="sm:hidden ml-2 px-3 py-1 rounded-full bg-green-600 text-white text-xs font-bold shadow-lg animate-pulse">
                                Chat CS
                            </span>
                        </a>
                    )}
                </main>
            </div>
        </div>
    );
}
