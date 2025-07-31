import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gradient-to-r from-[#26363b] via-[#3a4b52] to-[#26363b] animate-bgColor pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <div className="flex justify-center mb-6">
                        <img
                            src="/storage/images/cungsstore.jpeg"
                            alt="Cungstore Logo"
                            className="h-40"
                        />
                    </div>
                </Link>
            </div>

            <div className="mt-2 flex justify-center">
                <Link
                    href="/orders/track"
                    className="text-teal-500 hover:underline text-sm"
                >
                    Cek Status Pesanan
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
                {/* Floating CS Button */}
                <a
                    href="https://wa.me/6285157746677?text=Halo%20Admin%20Cungsstore,%20saya%20butuh%20bantuan."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center gap-2 animate-bounce"
                    title="Hubungi CS via WhatsApp"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-7 h-7"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 12c0 5.385 4.365 9.75 9.75 9.75 1.7 0 3.29-.425 4.68-1.17l3.57 1.02a.75.75 0 00.93-.93l-1.02-3.57A9.708 9.708 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12z"
                        />
                    </svg>
                    <span className="font-bold hidden sm:inline">CS</span>
                </a>
            </div>
        </div>
    );
}
