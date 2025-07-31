import React from "react";
import { Head, Link } from "@inertiajs/react";

export default function OrderHistory({ orders = [] }) {
    return (
        <div className="max-w-4xl mx-auto p-6 mt-12 bg-gray-900 rounded-xl shadow-2xl text-white">
            <Head title="Riwayat Pesanan" />
            <h2 className="text-2xl font-bold mb-6 text-teal-400">
                Riwayat Pesanan Saya
            </h2>
            {orders.length === 0 ? (
                <div className="text-center text-gray-400">
                    Belum ada pesanan.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                            <tr className="bg-gray-800">
                                <th className="px-4 py-2 text-left">
                                    No Invoice
                                </th>
                                <th className="px-4 py-2 text-left">Produk</th>
                                <th className="px-4 py-2 text-left">
                                    Kategori
                                </th>
                                <th className="px-4 py-2 text-left">Total</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Tanggal</th>
                                <th className="px-4 py-2"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="hover:bg-gray-800 transition"
                                >
                                    <td className="px-4 py-2 font-mono">
                                        {order.order_number}
                                    </td>
                                    <td className="px-4 py-2">
                                        {order.product?.title || "-"}
                                    </td>
                                    <td className="px-4 py-2">
                                        {order.category?.title || "-"}
                                    </td>
                                    <td className="px-4 py-2 text-yellow-400 font-bold">
                                        Rp {order.amount}
                                    </td>
                                    <td className="px-4 py-2">
                                        {order.status === 0 && (
                                            <span className="text-yellow-400">
                                                Menunggu
                                            </span>
                                        )}
                                        {order.status === 1 && (
                                            <span className="text-green-400">
                                                Sukses
                                            </span>
                                        )}
                                        {order.status === 2 && (
                                            <span className="text-red-400">
                                                Batal
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-xs">
                                        {new Date(
                                            order.created_at
                                        ).toLocaleString("id-ID")}
                                    </td>
                                    <td className="px-4 py-2">
                                        <Link
                                            href={"/checkout/" + order.id}
                                            className="text-teal-400 hover:underline text-sm"
                                        >
                                            Detail
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
