import { Head, Link } from "@inertiajs/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Dropdown from "@/Components/Dropdown";

export default function Welcome({
    auth = {},
    CategoryData = [],
    CarouselData = [],
}) {
    // Settings for the carousel
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    console.log("AUTH PROPS (Welcome):", auth);

    if (!Array.isArray(CategoryData) || !Array.isArray(CarouselData)) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-red-500">
                        Terjadi Error
                    </h2>
                    <p>
                        Data kategori atau carousel tidak tersedia. Silakan
                        refresh halaman atau hubungi admin.
                    </p>
                </div>
            </div>
        );
    }

    const games = CategoryData.filter((item) => item.type < 3);
    const apps = CategoryData.filter((item) => item.type === 3);
    const joki = CategoryData.filter((item) => item.type === 4);

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-900 min-h-screen">
                {/* Fixed Navbar */}
                <nav className="bg-black fixed top-0 left-0 w-full z-50 p-4">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <Link
                            href="/"
                            className="text-teal-500 font-semibold text-2xl"
                        >
                            CUNGSSTORE
                        </Link>
                        <div className="flex space-x-6">
                            {(!auth ||
                                (Number.isInteger(auth.user?.id) &&
                                    auth.user.role === 0)) && (
                                <Link
                                    href={
                                        auth && Number.isInteger(auth.user?.id)
                                            ? "/orders/history"
                                            : "/orders/track"
                                    }
                                    className="text-teal-400 hover:text-white font-bold border border-teal-500 rounded px-3 py-1 transition"
                                >
                                    Cek Status Pesanan
                                </Link>
                            )}
                            {auth &&
                                Number.isInteger(auth.user?.id) &&
                                auth.user.role === 1 && (
                                    <Link
                                        href={route("admin.dashboard")}
                                        className="text-teal-400 hover:text-white font-bold border border-teal-500 rounded px-3 py-1 transition"
                                    >
                                        Admin Dashboard
                                    </Link>
                                )}
                            {auth && Number.isInteger(auth.user?.id) ? (
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-black px-3 py-2 text-sm font-medium leading-4 text-white transition duration-150 ease-in-out hover:text-teal-400 focus:outline-none"
                                            >
                                                {auth.user.name}
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
                                        {auth.user.role === 0 && (
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
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="text-white hover:text-teal-500"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="text-white hover:text-teal-500"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Content Section */}
                <div
                    className="py-6 pt-20"
                    style={{ backgroundColor: "#111827" }}
                >
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <Slider {...settings}>
                            {CarouselData.map((item) => (
                                <div
                                    key={item.id}
                                    className="relative w-100 h-100 rounded-lg shadow-lg overflow-hidden"
                                >
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>

                {/* Category Section */}
                <div className="py-12" style={{ backgroundColor: "#111827" }}>
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-black shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-6 text-teal-500">
                                Available Games
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {games.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={route("productlist", item.id)}
                                        className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition hover:bg-teal-500"
                                    >
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="font-bold text-xl mb-2 text-white">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-400">
                                                {item.description}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Apps Section */}
                            <h3 className="text-xl font-semibold mt-12 mb-6 text-teal-500">
                                Available Apps
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {apps.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={route("productlist", item.id)}
                                        className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition hover:bg-teal-500"
                                    >
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="font-bold text-xl mb-2 text-white">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-400">
                                                {item.description}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* JOKI Section */}
                            <h3 className="text-xl font-semibold mt-12 mb-6 text-teal-500">
                                JASA JOKI
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {joki.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={route("productlist", item.id)}
                                        className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition hover:bg-teal-500"
                                    >
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="font-bold text-xl mb-2 text-white">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-400">
                                                {item.description}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <footer className="bg-black text-white py-12 mt-12">
                    <div className="max-w-7xl mx-auto flex flex-wrap justify-between">
                        {/* Company Info */}
                        <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
                            <h4 className="text-teal-500 font-semibold text-lg">
                                CUNGSSTORE
                            </h4>
                            <p className="text-gray-400">
                                We provide the best games, apps, and services
                                for all your needs.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
                            <h4 className="text-teal-500 font-semibold text-lg">
                                Quick Links
                            </h4>
                            <ul className="text-gray-400">
                                <li>
                                    <Link
                                        href="/"
                                        className="hover:text-teal-500"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className="hover:text-teal-500"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className="hover:text-teal-500"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Social Media */}
                        <div className="w-full sm:w-1/3">
                            <h4 className="text-teal-500 font-semibold text-lg">
                                Follow Us
                            </h4>
                            <ul className="flex space-x-4">
                                <li>
                                    <a
                                        href="https://facebook.com"
                                        className="text-gray-400 hover:text-teal-500"
                                    >
                                        Facebook
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://twitter.com"
                                        className="text-gray-400 hover:text-teal-500"
                                    >
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://instagram.com"
                                        className="text-gray-400 hover:text-teal-500"
                                    >
                                        Instagram
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </footer>
                {/* Floating CS Button - only for guest/user (bukan admin) */}
                {(!auth.user || auth.user.role === 0) && (
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
            </div>
        </>
    );
}
