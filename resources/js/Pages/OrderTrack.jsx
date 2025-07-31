import React, { useState, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import {
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    ClipboardIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

export default function OrderTrack({ result = null, error = null }) {
    const { data, setData, post, processing, errors } = useForm({
        order_number: "",
        whatsapp: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [status, setStatus] = useState(result?.status);
    const [statusText, setStatusText] = useState(
        result ? getStatusText(result.status) : ""
    );
    const [statusColor, setStatusColor] = useState(
        result ? getStatusColor(result.status) : ""
    );
    const [notif, setNotif] = useState("");

    useEffect(() => {
        if (!result) return;
        setStatus(result.status);
        setStatusText(getStatusText(result.status));
        setStatusColor(getStatusColor(result.status));
        // Polling status pembayaran setiap 5 detik
        let interval = setInterval(async () => {
            try {
                const res = await axios.get(`/api/order-status/${result.id}`);
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
    }, [result]);

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

    // Handler khusus untuk input WhatsApp
    const handleWhatsappChange = (e) => {
        let input = e.target.value.replace(/\D/g, "");
        if (!input.startsWith("62")) input = "62" + input;
        setData("whatsapp", "+" + input);
    };

    // Handler khusus untuk input No Invoice (bebas)
    const handleOrderNumberChange = (e) => {
        setData("order_number", e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Kirim apa adanya
        post("/orders/track", {
            data: { ...data },
            onSuccess: () => setSubmitted(true),
        });
    };

    return (
        <div className="max-w-lg mx-auto p-6 mt-12 bg-gray-900 rounded-xl shadow-2xl text-white">
            <Head title="Cek Status Pesanan" />
            <h2 className="text-2xl font-bold mb-6 text-teal-400">
                Cek Status Pesanan
            </h2>
            <div className="mb-4">
                <button
                    type="button"
                    onClick={() =>
                        window.history.length > 1
                            ? window.history.back()
                            : (window.location.href = "/")
                    }
                    className="bg-gray-700 hover:bg-teal-500 text-white px-4 py-2 rounded mr-2"
                >
                    &larr; Back
                </button>
            </div>
            <form onSubmit={handleSubmit} className="mb-6 space-y-4">
                <div>
                    <label className="block mb-1">Kode Invoice</label>
                    <input
                        type="text"
                        name="order_number"
                        value={data.order_number}
                        onChange={handleOrderNumberChange}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white font-mono"
                        placeholder="Masukkan kode invoice (contoh: ORD/ML/2025/07/1234SJAAH123)"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Nomor WhatsApp</label>
                    <div className="flex items-center">
                        <span className="bg-gray-800 text-gray-400 px-2 py-2 rounded-l select-none">
                            +62
                        </span>
                        <input
                            type="text"
                            name="whatsapp"
                            value={data.whatsapp.replace(/^\+62/, "")}
                            onChange={handleWhatsappChange}
                            className="w-full p-2 rounded-r bg-gray-800 border border-gray-700 text-white"
                            placeholder="8xxxxxxxxxx"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-teal-500 hover:bg-teal-400 text-white py-2 rounded font-bold"
                    disabled={processing}
                >
                    {processing ? "Mencari..." : "Cek Status"}
                </button>
            </form>
            {error && (
                <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
                    {error}
                </div>
            )}
            {result && (
                <div className="max-w-2xl mx-auto bg-gray-900 rounded-2xl shadow-2xl p-6 mt-8">
                    {/* Notifikasi status */}
                    {notif && (
                        <div className="fixed top-6 right-6 z-50 px-4 py-2 rounded shadow-lg text-white bg-green-500 animate-bounce">
                            {notif}
                        </div>
                    )}
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
                            {result.category?.title}
                        </span>{" "}
                        : {result.product?.title}
                    </div>
                    <div className="mb-2 text-gray-400">
                        Nomor Invoice:{" "}
                        <span className="text-white font-mono">
                            {result.order_number}
                        </span>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    result.order_number
                                );
                            }}
                            className="ml-2 p-1 rounded bg-gray-700 hover:bg-teal-500 transition"
                            title="Copy"
                        >
                            <ClipboardIcon className="w-5 h-5 text-white" />
                        </button>
                    </div>
                    <div className="mb-2 text-gray-400">
                        <span className="font-semibold">Total:</span>{" "}
                        <span className="text-yellow-400 font-bold text-lg">
                            Rp {result.amount}
                        </span>
                    </div>
                    <div className="mb-2 text-gray-400">
                        <span className="font-semibold">Nama Pengirim:</span>{" "}
                        <span className="text-white">{result.sender_name}</span>
                    </div>
                    <div className="mb-2 text-gray-400">
                        <span className="font-semibold">WhatsApp:</span>{" "}
                        <span className="text-white">{result.whatsapp}</span>
                    </div>
                    <div className="mt-6 bg-gray-700 p-4 rounded-lg text-sm text-gray-200">
                        <b>Instruksi:</b>
                        <ul className="list-disc ml-6 mt-2 space-y-1">
                            <li>
                                Transfer sesuai nominal ke rekening yang
                                diberikan saat order.
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
                    <div className="mt-6 flex justify-end">
                        <a
                            href={`/checkout/${result.id}`}
                            className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded shadow font-bold"
                        >
                            Kembali ke halaman pembayaran
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
