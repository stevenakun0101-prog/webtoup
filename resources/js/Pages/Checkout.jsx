import { useEffect, useState } from "react";
import {
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    ClipboardIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

export default function Checkout({ order, payment_method, qr_url, error }) {
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold mb-4 text-red-500">
                        Terjadi Error
                    </h2>
                    <p>
                        {error}
                        <br />
                        Silakan kembali ke halaman utama dan coba lagi.
                    </p>
                    <a
                        href="/"
                        className="mt-6 inline-block bg-teal-500 hover:bg-teal-400 text-white px-6 py-2 rounded"
                    >
                        Kembali ke Home
                    </a>
                </div>
            </div>
        );
    }
    if (!order || !payment_method) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold mb-4 text-red-500">
                        Terjadi Error
                    </h2>
                    <p>
                        Data order atau metode pembayaran tidak ditemukan.
                        <br />
                        Silakan kembali ke halaman utama dan coba lagi.
                    </p>
                    <a
                        href="/"
                        className="mt-6 inline-block bg-teal-500 hover:bg-teal-400 text-white px-6 py-2 rounded"
                    >
                        Kembali ke Home
                    </a>
                </div>
            </div>
        );
    }
    const [mlResult, setMlResult] = useState({ nickname: "" });
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [showQRModal, setShowQRModal] = useState(false);
    const [animateModal, setAnimateModal] = useState(false);
    const [status, setStatus] = useState(order.status);
    const [statusText, setStatusText] = useState(getStatusText(order.status));
    const [statusColor, setStatusColor] = useState(
        getStatusColor(order.status)
    );
    const [notif, setNotif] = useState("");
    const [copied, setCopied] = useState(false);

    function getStatusText(status) {
        if (status === 0) return "Menunggu Pembayaran";
        if (status === 1) return "Pembayaran Berhasil";
        if (status === 2) return "Transaksi Dibatalkan";
        return "Status Tidak Diketahui";
    }
    function getStatusColor(status) {
        if (status === 0) return "text-yellow-400";
        if (status === 1) return "text-green-500";
        if (status === 2) return "text-red-500";
        return "text-gray-400";
    }

    // Fetch the nickname using the provided order data
    const checkUsername = async () => {
        setLoading(true);
        setApiError(null);
        try {
            const response = await fetch(
                `/ml/${order.game_id}/${order.game_server}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                }
            );

            const data = await response.json();

            if (response.ok) {
                const nickname = data.name.replace(/\+/g, " ") || "Unknown";
                setMlResult({ nickname });
            } else {
                setApiError(data.message || "Something went wrong");
            }
        } catch (err) {
            setApiError("Failed to fetch data from API");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Check username on component mount
        checkUsername();

        // Polling status pembayaran setiap 5 detik
        let interval = setInterval(async () => {
            try {
                const res = await axios.get(`/api/order-status/${order.id}`);
                if (res.data && res.data.success) {
                    setStatus(res.data.status);
                    setStatusText(getStatusText(res.data.status));
                    setStatusColor(getStatusColor(res.data.status));
                    if (res.data.status === 1)
                        setNotif(
                            "Pembayaran berhasil! Pesanan akan segera diproses."
                        );
                    if (res.data.status === 2)
                        setNotif(
                            "Transaksi dibatalkan. Silakan hubungi admin jika ada kendala."
                        );
                }
            } catch {}
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleOpenQRModal = () => {
        setShowQRModal(true);
        setAnimateModal(true);
    };

    const handleCloseModal = () => {
        setAnimateModal(false);
        setTimeout(() => setShowQRModal(false), 300);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(payment_method.no_rek || "-");
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-8 bg-gray-900 rounded-2xl mt-12 sm:mt-24 shadow-2xl">
            {/* Notifikasi status */}
            {notif && (
                <div className="fixed top-6 right-6 z-50 px-4 py-2 rounded shadow-lg text-white bg-green-500 animate-bounce">
                    {notif}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column - Detail Pembelian */}
                <div className="col-span-2">
                    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            {status === 0 && (
                                <ClockIcon className="w-7 h-7 text-yellow-400 animate-pulse" />
                            )}
                            {status === 1 && (
                                <CheckCircleIcon className="w-7 h-7 text-green-500 animate-bounce" />
                            )}
                            {status === 2 && (
                                <XCircleIcon className="w-7 h-7 text-red-500 animate-bounce" />
                            )}
                            <h2 className="text-xl font-bold text-white">
                                Status:&nbsp;
                                <span className={`${statusColor}`}>
                                    {statusText}
                                </span>
                            </h2>
                        </div>
                        <div className="mb-2 text-gray-400">
                            <span className="font-semibold text-white">
                                {order.category.title}
                            </span>{" "}
                            : {order.product.title}
                        </div>
                        <div className="mb-2 text-gray-400">
                            Nomor Invoice:{" "}
                            <span className="text-white font-mono">
                                {order.order_number}
                            </span>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        order.order_number
                                    );
                                }}
                                className="ml-2 p-1 rounded bg-gray-700 hover:bg-teal-500 transition"
                                title="Copy"
                            >
                                <ClipboardIcon className="w-5 h-5 text-white" />
                            </button>
                        </div>
                        <div className="mb-2 text-xs text-yellow-400">
                            Salin nomor invoice ini untuk cek status pesanan di
                            kemudian hari.
                        </div>
                        <div className="mb-2 text-gray-400">
                            <span className="font-semibold">Total:</span>{" "}
                            <span className="text-yellow-400 font-bold text-lg">
                                Rp {order.amount}
                            </span>
                        </div>
                        <div className="mb-2 text-gray-400">
                            <span className="font-semibold">Metode:</span>{" "}
                            <span className="text-white">
                                {payment_method.label}
                            </span>
                        </div>
                        <div className="mb-2 text-gray-400">
                            <span className="font-semibold">
                                Nama Pengirim:
                            </span>{" "}
                            <span className="text-white">
                                {order.sender_name}
                            </span>
                        </div>
                        <div className="mb-2 text-gray-400">
                            <span className="font-semibold">WhatsApp:</span>{" "}
                            <span className="text-white">{order.whatsapp}</span>
                        </div>
                        {mlResult?.nickname && (
                            <div className="mb-2 text-gray-400">
                                <span className="font-semibold">Nickname:</span>{" "}
                                <span className="text-white">
                                    {mlResult.nickname}
                                </span>
                            </div>
                        )}
                        <div className="mt-6 flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-white">
                                    Nomor Rekening:
                                </span>
                                <span className="text-lg font-mono text-teal-400">
                                    {payment_method.no_rek || "-"}
                                </span>
                                <button
                                    onClick={handleCopy}
                                    className="ml-2 p-1 rounded bg-gray-700 hover:bg-teal-500 transition"
                                    title="Copy"
                                >
                                    <ClipboardIcon className="w-5 h-5 text-white" />
                                </button>
                                {copied && (
                                    <span className="text-green-400 ml-2">
                                        Disalin!
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-white">
                                    Atas Nama:
                                </span>
                                <span className="text-white">
                                    {payment_method.atas_nama || "-"}
                                </span>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button
                                onClick={handleOpenQRModal}
                                className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-lg font-bold text-lg shadow-lg hover:from-teal-400 hover:to-blue-400 transition"
                            >
                                Lihat QR Pembayaran
                            </button>
                        </div>
                        <div className="mt-6 bg-gray-700 p-4 rounded-lg text-sm text-gray-200">
                            <b>Instruksi:</b>
                            <ul className="list-disc ml-6 mt-2 space-y-1">
                                <li>
                                    Transfer sesuai nominal ke rekening di atas.
                                </li>
                                <li>
                                    Gunakan QRIS untuk pembayaran instan (jika
                                    tersedia).
                                </li>
                                <li>
                                    Setelah pembayaran, status akan otomatis
                                    berubah.
                                </li>
                                <li>
                                    Jika sudah bayar tapi status belum berubah,
                                    hubungi admin via WhatsApp.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Right Column - QR & Payment Info */}
                <div className="flex flex-col items-center justify-center gap-6">
                    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center">
                        <h4 className="font-bold text-gray-800 mb-2">
                            QR Pembayaran
                        </h4>
                        <img
                            src={qr_url}
                            alt="QR Code"
                            className="w-48 h-48 object-contain rounded-lg border-4 border-teal-400 shadow-lg hover:scale-105 transition"
                        />
                        <span className="text-xs text-gray-500 mt-2">
                            Scan QR ini untuk bayar via e-wallet/bank
                        </span>
                    </div>
                    <a
                        href="/"
                        target="_blank"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4 w-full text-center"
                    >
                        Kembali ke Home
                    </a>
                </div>
            </div>
            {/* QR Modal */}
            {showQRModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div
                        className={`bg-gray-900 p-6 rounded-lg w-11/12 sm:w-96 text-center transform transition-transform duration-300 ${
                            animateModal
                                ? "scale-100 opacity-100"
                                : "scale-75 opacity-0"
                        }`}
                    >
                        <h3 className="text-lg font-bold text-white mb-4">
                            Scan QR Code untuk Bayar
                        </h3>
                        <img
                            src={qr_url}
                            alt="QR Code"
                            className="mx-auto mb-4 w-60 h-60 object-contain rounded-lg border-4 border-teal-400"
                        />
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
                            onClick={handleCloseModal}
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
