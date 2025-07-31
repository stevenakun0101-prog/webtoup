import { useState } from "react";
import { Head, useForm, Link, router } from "@inertiajs/react";
import axios from "axios";
import { useEffect } from "react";
import Dropdown from "@/Components/Dropdown";

// Simple toast component
function Toast({ message, type, onClose }) {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(onClose, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);
    if (!message) return null;
    return (
        <div
            className={`fixed top-6 right-6 z-50 px-4 py-2 rounded shadow-lg text-white ${
                type === "success" ? "bg-teal-500" : "bg-red-500"
            }`}
        >
            {message}
        </div>
    );
}

export default function ProductList({
    auth = {},
    products = [],
    category = {},
}) {
    console.log("AUTH PROPS (ProductList):", auth);
    if (!Array.isArray(products) || !category || !category.title) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-red-500">
                        Terjadi Error
                    </h2>
                    <p>
                        Data produk atau kategori tidak tersedia. Silakan
                        refresh halaman atau hubungi admin.
                    </p>
                </div>
            </div>
        );
    }
    // Form state
    const { data, setData } = useForm({
        product_id: "",
        payment_method: "",
        game_id: "",
        game_server: "",
        whatsapp: "",
        sender_name: "",
        loginVia: "moonton",
        userId: "",
        emailOrPhone: "",
        password: "",
        heroRequest: "",
        notes: "",
        starOrder: "",
    });
    // UI state
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState("");
    const [mlResult, setMlResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [toast, setToast] = useState({ message: "", type: "success" });
    // Payment methods
    const availablePaymentMethods = [
        {
            key: "dana",
            label: "DANA",
            image: "/storage/assets/dana.webp",
            no_rek: "085157746677",
            atas_nama: "STEVEN LIE",
        },
        {
            key: "gopay",
            label: "GoPay",
            image: "/storage/assets/gopay.webp",
            no_rek: "085157746677",
            atas_nama: "STEVEN LIE",
        },
        {
            key: "ovo",
            label: "OVO",
            image: "/storage/assets/ovo.png",
            no_rek: "085157746677",
            atas_nama: "STEVEN LIE",
        },
        {
            key: "bca_va",
            label: "BCA Virtual Account",
            image: "/storage/assets/bcaa.svg",
            no_rek: "4141224284",
            atas_nama: "STEVEN LIE",
        },
        {
            key: "mandiri_va",
            label: "Mandiri Virtual Account",
            image: "/storage/assets/mandirii.png",
            no_rek: "1200013671826",
            atas_nama: "STEVEN LIE",
        },
        {
            key: "seabank_va",
            label: "SeaBank Virtual Account",
            image: "/storage/assets/sb.png",
            no_rek: "901152172987",
            atas_nama: "STEVEN LIE",
        },
        {
            key: "qris",
            label: "QRIS",
            image: "/storage/assets/qris.png",
            no_rek: "-",
            atas_nama: "CUNGSSTORE",
        },
    ];

    // Input handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
    };
    // WhatsApp khusus
    const handleWhatsappChange = (e) => {
        let input = e.target.value.replace(/\D/g, "");
        if (!input.startsWith("62")) input = "62" + input;
        setData("whatsapp", "+" + input);
        setFormErrors((prev) => ({ ...prev, whatsapp: "" }));
    };
    // Product select
    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setData("product_id", product.id);
        setFormErrors((prev) => ({ ...prev, product_id: "" }));
    };
    // Payment select
    const handlePaymentClick = (key) => {
        setSelectedPayment(key);
        setData("payment_method", key);
        setFormErrors((prev) => ({ ...prev, payment_method: "" }));
    };
    // Username check (ML)
    const checkUsername = async (g_id, g_server) => {
        setLoading(true);
        setFormErrors((prev) => ({ ...prev, game_id: "" }));
        if (category?.type === 1) {
            try {
                const response = await fetch(`/ml/${g_id}/${g_server}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });
                const dataRes = await response.json();
                if (response.ok) {
                    setMlResult(dataRes);
                    setData("game_server", g_server);
                } else {
                    setFormErrors((prev) => ({
                        ...prev,
                        game_id: "ID/Server tidak valid",
                    }));
                }
            } catch {
                setFormErrors((prev) => ({
                    ...prev,
                    game_id: "Gagal cek username",
                }));
            } finally {
                setLoading(false);
            }
        } else {
            setMlResult({ name: "N/A", id: "123456" });
            setData("game_server", g_server);
        }
    };
    // Validasi sebelum checkout
    const validateForm = () => {
        const errors = {};
        if (!selectedProduct) errors.product_id = "Pilih produk dulu";
        if (!selectedPayment) errors.payment_method = "Pilih metode pembayaran";
        if (!data.whatsapp) errors.whatsapp = "Isi nomor WhatsApp";
        if (!data.sender_name) errors.sender_name = "Isi nama pengirim";
        if (category?.type === 1 && (!data.game_id || !data.game_server))
            errors.game_id = "Isi ID & Server";
        if (category?.type === 4) {
            if (!data.loginVia) errors.loginVia = "Pilih login via";
            if (!data.userId) errors.userId = "Isi User ID & Nickname";
            if (!data.emailOrPhone)
                errors.emailOrPhone = "Isi Email/No. HP/Moonton ID";
            if (!data.password) errors.password = "Isi password";
            if (!data.heroRequest) errors.heroRequest = "Isi request hero";
            if (!data.starOrder) errors.starOrder = "Isi order bintang";
            if (!data.notes) errors.notes = "Isi catatan untuk penjoki";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    // Checkout
    const handleCheckout = async () => {
        if (!validateForm()) return;
        setLoadingModal(true);
        if (category?.type === 1)
            await checkUsername(data.game_id, data.game_server);
        setLoadingModal(false);
        setShowConfirmationModal(true);
    };
    // Confirm checkout
    const handleConfirmCheckout = async () => {
        setLoadingModal(true);
        try {
            const response = await axios.post("/api/checkout", { ...data });
            console.log("[DEBUG] Checkout API response:", response);
            // Fallback: jika order_id ada, langsung redirect
            if (response.data && response.data.order_id) {
                setToast({ message: "Checkout berhasil!", type: "success" });
                console.log(
                    "[DEBUG] Redirecting to /checkout/" + response.data.order_id
                );
                setTimeout(() => {
                    router.visit(`/checkout/${response.data.order_id}`);
                }, 500); // beri jeda agar toast sempat tampil
                return;
            }
            // Jika error validasi
            if (response.status === 200 && response.data.status === 422) {
                setToast({
                    message:
                        "Validasi gagal: " +
                        JSON.stringify(response.data.errors),
                    type: "error",
                });
                setFormErrors({
                    global:
                        "Validasi gagal: " +
                        JSON.stringify(response.data.errors),
                });
                return;
            }
            // Jika error server
            if (response.status === 200 && response.data.status === 500) {
                setToast({
                    message: response.data.message || "Server error.",
                    type: "error",
                });
                setFormErrors({
                    global: response.data.message || "Server error.",
                });
                return;
            }
            // Fallback error
            setToast({
                message: "Gagal proses checkout. Tidak ada order_id.",
                type: "error",
            });
            setFormErrors({
                global: "Gagal proses checkout. Tidak ada order_id.",
            });
        } catch (err) {
            if (err.response && err.response.data) {
                setToast({
                    message:
                        "Error: " +
                        (err.response.data.message ||
                            JSON.stringify(err.response.data.errors)),
                    type: "error",
                });
                setFormErrors({
                    global:
                        err.response.data.message ||
                        JSON.stringify(err.response.data.errors),
                });
            } else {
                setToast({
                    message: "Gagal proses checkout. Coba lagi.",
                    type: "error",
                });
                setFormErrors({ global: "Gagal proses checkout. Coba lagi." });
            }
        } finally {
            setLoadingModal(false);
            setShowConfirmationModal(false);
        }
    };

    return (
        <>
            <Head title={`${category.title} - Products`} />
            {/* Navbar */}
            <nav className="bg-black p-4 fixed top-0 left-0 w-full z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link
                        href="/"
                        className="text-teal-500 font-semibold text-2xl"
                    >
                        CUNGSSTORE
                    </Link>
                    <div className="flex space-x-6">
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
            {/* Modal Konfirmasi */}
            {showConfirmationModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-gray-800 text-white p-6 rounded-lg w-11/12 sm:w-1/3">
                        <h3 className="text-teal-400 font-semibold text-lg mb-4">
                            Konfirmasi Pesanan
                        </h3>
                        {loadingModal ? (
                            <div className="flex justify-center items-center h-32">
                                <svg
                                    className="animate-spin h-10 w-10 text-teal-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8z"
                                    ></path>
                                </svg>
                            </div>
                        ) : (
                            <div className="mb-4 space-y-2">
                                <p>
                                    <span className="text-teal-400">
                                        Produk:
                                    </span>{" "}
                                    {selectedProduct?.title}
                                </p>
                                <p>
                                    <span className="text-teal-400">
                                        Harga:
                                    </span>{" "}
                                    {selectedProduct &&
                                        new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(selectedProduct.price)}
                                </p>
                                {category?.type === 1 && (
                                    <p>
                                        <span className="text-teal-400">
                                            Nickname:
                                        </span>{" "}
                                        {mlResult?.name?.replace(/\+/g, " ") ||
                                            "N/A"}
                                    </p>
                                )}
                                <p>
                                    <span className="text-teal-400">
                                        Metode Pembayaran:
                                    </span>{" "}
                                    {
                                        availablePaymentMethods.find(
                                            (m) => m.key === selectedPayment
                                        )?.label
                                    }
                                </p>
                                <p>
                                    <span className="text-teal-400">
                                        WhatsApp:
                                    </span>{" "}
                                    {data.whatsapp}
                                </p>
                                <p>
                                    <span className="text-teal-400">
                                        Nama Pengirim:
                                    </span>{" "}
                                    {data.sender_name}
                                </p>
                                {category?.type === 4 && (
                                    <>
                                        <p>
                                            <span className="text-teal-400">
                                                ID Mobile Legends:
                                            </span>{" "}
                                            {data.game_id}
                                        </p>
                                        <p>
                                            <span className="text-teal-400">
                                                Server Mobile Legends:
                                            </span>{" "}
                                            {data.game_server}
                                        </p>
                                        <p>
                                            <span className="text-teal-400">
                                                Login Via:
                                            </span>{" "}
                                            {data.loginVia}
                                        </p>
                                        <p>
                                            <span className="text-teal-400">
                                                User ID & Nickname:
                                            </span>{" "}
                                            {data.userId}
                                        </p>
                                        <p>
                                            <span className="text-teal-400">
                                                Email/No. HP:
                                            </span>{" "}
                                            {data.emailOrPhone}
                                        </p>
                                        <p>
                                            <span className="text-teal-400">
                                                Password:
                                            </span>{" "}
                                            {data.password}
                                        </p>
                                        <p>
                                            <span className="text-teal-400">
                                                Request Hero:
                                            </span>{" "}
                                            {data.heroRequest}
                                        </p>
                                        <p>
                                            <span className="text-teal-400">
                                                Order Bintang:
                                            </span>{" "}
                                            {data.starOrder}
                                        </p>
                                        <p>
                                            <span className="text-teal-400">
                                                Catatan:
                                            </span>{" "}
                                            {data.notes}
                                        </p>
                                    </>
                                )}
                            </div>
                        )}
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => setShowConfirmationModal(false)}
                                className="bg-gray-600 text-white py-2 px-4 rounded-md"
                                disabled={loadingModal}
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleConfirmCheckout}
                                className="bg-teal-500 text-white py-2 px-4 rounded-md"
                                disabled={loadingModal}
                            >
                                {loadingModal
                                    ? "Memproses..."
                                    : "Konfirmasi & Checkout"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Main Content */}
            <div className="pt-20 bg-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-800 text-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="font-semibold text-lg mb-4 text-teal-400">
                            Pilih Produk
                        </h3>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className={`cursor-pointer border-2 rounded-lg p-4 bg-[rgb(1,2,22)] ${
                                        selectedProduct?.id === product.id
                                            ? "border-teal-400"
                                            : "border-gray-600"
                                    } hover:border-teal-500 transition-all`}
                                    onClick={() => handleProductClick(product)}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="text-left">
                                            <h3 className="text-base sm:text-lg font-bold text-white">
                                                {product.title}
                                            </h3>
                                            <p className="text-sm sm:text-base text-gray-400 mt-1">
                                                {new Intl.NumberFormat(
                                                    "id-ID",
                                                    {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    }
                                                ).format(product.price)}
                                            </p>
                                        </div>
                                        {category?.type === 1 && (
                                            <img
                                                src="/storage/assets/diamond.gif"
                                                alt="diamond"
                                                className="w-14 h-10 sm:w-18 sm:h-13"
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {formErrors.product_id && (
                            <p className="text-red-500 mb-2">
                                {formErrors.product_id}
                            </p>
                        )}
                        {/* Input ID/Server untuk ML */}
                        {category?.type === 1 && (
                            <div className="mb-4 grid grid-cols-6 gap-4">
                                <input
                                    type="text"
                                    name="game_id"
                                    value={data.game_id}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded w-full bg-gray-700 text-white col-span-3"
                                    placeholder="ID Mobile Legends"
                                />
                                <input
                                    type="text"
                                    name="game_server"
                                    value={data.game_server}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded w-full bg-gray-700 text-white col-span-3"
                                    placeholder="Server"
                                />
                                {loading && (
                                    <span className="col-span-6 text-teal-400">
                                        Checking...
                                    </span>
                                )}
                                {formErrors.game_id && (
                                    <span className="col-span-6 text-red-500">
                                        {formErrors.game_id}
                                    </span>
                                )}
                                {mlResult && mlResult.name && (
                                    <span className="col-span-6 text-teal-400">
                                        Username:{" "}
                                        {mlResult.name.replace(/\+/g, " ")}
                                    </span>
                                )}
                            </div>
                        )}
                        {/* Input ID untuk type 2 */}
                        {category?.type === 2 && (
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="game_id"
                                    value={data.game_id}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded w-full bg-gray-700 text-white"
                                    placeholder="ID"
                                />
                            </div>
                        )}
                        {/* JOKI ML */}
                        {category?.type === 4 &&
                            category?.title === "JOKI ML" && (
                                <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Tambahan: Input ID & Server ML */}
                                    <div>
                                        <label className="block text-sm font-medium">
                                            ID Mobile Legends
                                        </label>
                                        <input
                                            type="text"
                                            name="game_id"
                                            value={data.game_id}
                                            onChange={handleInputChange}
                                            className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Masukkan ID Mobile Legends"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">
                                            Server Mobile Legends
                                        </label>
                                        <input
                                            type="text"
                                            name="game_server"
                                            value={data.game_server}
                                            onChange={handleInputChange}
                                            className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Masukkan Server Mobile Legends"
                                        />
                                    </div>
                                    {/* Lanjutkan input joki yang sudah ada */}
                                    <div>
                                        <label className="block text-sm font-medium">
                                            Login Via
                                        </label>
                                        <select
                                            name="loginVia"
                                            onChange={handleInputChange}
                                            value={data.loginVia}
                                            className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="moonton">
                                                Moonton ID
                                            </option>
                                            <option value="vk">VK</option>
                                            <option value="tiktok">
                                                TikTok
                                            </option>
                                            <option value="facebook">
                                                Facebook
                                            </option>
                                            <option value="googleplay">
                                                Google Play
                                            </option>
                                        </select>
                                        {formErrors.loginVia && (
                                            <p className="text-red-500">
                                                {formErrors.loginVia}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">
                                            User ID & Nick Name
                                        </label>
                                        <input
                                            type="text"
                                            name="userId"
                                            value={data.userId}
                                            onChange={handleInputChange}
                                            className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Masukkan User ID & Nick Name"
                                        />
                                        {formErrors.userId && (
                                            <p className="text-red-500">
                                                {formErrors.userId}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">
                                            Email/No. Hp/Moonton ID
                                        </label>
                                        <input
                                            type="text"
                                            name="emailOrPhone"
                                            value={data.emailOrPhone}
                                            onChange={handleInputChange}
                                            className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Masukkan Email/No. Hp/Moonton ID"
                                        />
                                        {formErrors.emailOrPhone && (
                                            <p className="text-red-500">
                                                {formErrors.emailOrPhone}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            onChange={handleInputChange}
                                            className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Masukkan Password"
                                        />
                                        {formErrors.password && (
                                            <p className="text-red-500">
                                                {formErrors.password}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">
                                            Request Hero (Minimal 3 Hero)
                                        </label>
                                        <input
                                            type="text"
                                            name="heroRequest"
                                            value={data.heroRequest}
                                            onChange={handleInputChange}
                                            className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Masukkan Request Hero (Minimal 3 Hero)"
                                        />
                                        {formErrors.heroRequest && (
                                            <p className="text-red-500">
                                                {formErrors.heroRequest}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">
                                            Order Bintang
                                        </label>
                                        <input
                                            type="number"
                                            name="starOrder"
                                            value={data.starOrder}
                                            onChange={handleInputChange}
                                            className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Masukkan Order berapa bintang"
                                        />
                                        {formErrors.starOrder && (
                                            <p className="text-red-500">
                                                {formErrors.starOrder}
                                            </p>
                                        )}
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium">
                                            Catatan Untuk Penjoki
                                        </label>
                                        <textarea
                                            name="notes"
                                            value={data.notes}
                                            onChange={handleInputChange}
                                            className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Masukkan Catatan Untuk Penjoki"
                                        ></textarea>
                                        {formErrors.notes && (
                                            <p className="text-red-500">
                                                {formErrors.notes}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        {/* WhatsApp & Sender Name */}
                        {selectedProduct && (
                            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-teal-400 mb-2">
                                        WhatsApp Number
                                    </label>
                                    <input
                                        type="text"
                                        name="whatsapp"
                                        value={data.whatsapp}
                                        onChange={handleWhatsappChange}
                                        className="w-full p-3 bg-gray-700 text-white rounded-md"
                                        placeholder="Masukkan nomor WhatsApp"
                                    />
                                    <p className="text-xs text-yellow-400 mt-1">
                                        Nomor WhatsApp <b>WAJIB BENAR!</b>{" "}
                                        Digunakan untuk cek status pesanan &
                                        histori, baik login maupun guest.
                                    </p>
                                    {formErrors.whatsapp && (
                                        <p className="text-red-500">
                                            {formErrors.whatsapp}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-teal-400 mb-2">
                                        Nama Pengirim
                                    </label>
                                    <input
                                        type="text"
                                        name="sender_name"
                                        value={data.sender_name}
                                        onChange={handleInputChange}
                                        className="w-full p-3 bg-gray-700 text-white rounded-md"
                                        placeholder="Masukkan nama pengirim"
                                    />
                                    {formErrors.sender_name && (
                                        <p className="text-red-500">
                                            {formErrors.sender_name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                        {/* Payment Methods */}
                        {selectedProduct && (
                            <div className="mb-6">
                                <h3 className="font-semibold text-lg mb-4 text-teal-400">
                                    Pilih Metode Pembayaran
                                </h3>
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                    {availablePaymentMethods.map((method) => (
                                        <div
                                            key={method.key}
                                            className={`border-2 p-4 rounded-md ${
                                                selectedPayment === method.key
                                                    ? "border-teal-500"
                                                    : "border-gray-600"
                                            } hover:border-teal-400 cursor-pointer`}
                                            onClick={() =>
                                                handlePaymentClick(method.key)
                                            }
                                        >
                                            <img
                                                src={method.image}
                                                alt={method.label}
                                                className="w-full h-10 object-contain"
                                            />
                                        </div>
                                    ))}
                                </div>
                                {formErrors.payment_method && (
                                    <p className="text-red-500 mt-2">
                                        {formErrors.payment_method}
                                    </p>
                                )}
                            </div>
                        )}
                        {/* Checkout Button */}
                        {selectedProduct && (
                            <div className="flex justify-center">
                                <button
                                    onClick={handleCheckout}
                                    className={`w-full sm:w-1/2 lg:w-1/4 bg-teal-500 hover:bg-teal-400 text-white py-3 rounded-md font-bold ${
                                        loadingModal
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                    disabled={loadingModal}
                                >
                                    {loadingModal ? "Memproses..." : "Checkout"}
                                </button>
                            </div>
                        )}
                        {formErrors.global && (
                            <p className="text-red-500 text-center mt-4">
                                {formErrors.global}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            {/* Footer */}
            <footer className="bg-black text-white py-6 mt-12">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <p>
                        &copy; {new Date().getFullYear()} CUNGSSTORE. All rights
                        reserved.
                    </p>
                    <div className="flex space-x-4">
                        <Link
                            href="/privacy-policy"
                            className="text-teal-500 hover:text-teal-400"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms-of-service"
                            className="text-teal-500 hover:text-teal-400"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </footer>
            {/* Toast Notification */}
            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ message: "", type: "success" })}
            />
            {/* Floating CS Button - only for guest/user (bukan admin) */}
            {(!auth?.user || auth.user.role === 0) && (
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
        </>
    );
}
