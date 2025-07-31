import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import DataTable from "react-data-table-component";
import ModalUpdate from "@/Components/PurchaseOrders/ModalUpdate";
import ModalDelete from "@/Components/PurchaseOrders/ModalDelete";
import { useState } from "react";

export default function PurchaseOrdersDashboard({ auth, orders }) {
    // State for search input
    const [search, setSearch] = useState("");

    // Define columns for the DataTable
    const columns = [
        {
            name: "#",
            selector: (row) => row.id,
            sortable: true,
            width: "50px",
        },
        {
            name: "Order Num",
            selector: (row) => row.order_number || "N/A",
            sortable: true,
        },
        {
            name: "User",
            selector: (row) => row.user?.name || "N/A",
            sortable: true,
        },
        {
            name: "Category",
            selector: (row) => row.category?.title || "N/A",
            sortable: true,
        },
        {
            name: "Product",
            selector: (row) => row.product?.title || "N/A",
            sortable: true,
        },
        {
            name: "Game Id",
            selector: (row) => row.game_id || "N/A",
        },
        {
            name: "Game Server",
            selector: (row) => row.game_server || "N/A",
        },
        {
            name: "Amount",
            selector: (row) =>
                new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(row.amount),
            sortable: true,
        },
        {
            name: "Status",
            cell: (row) => (
                <span
                    className={`inline-block px-2 py-1 rounded-full text-xs ${
                        row.status === 0
                            ? "bg-red-500 text-white"
                            : row.status === 1
                            ? "bg-green-500 text-white"
                            : row.status === 2
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-500 text-white"
                    }`}
                >
                    {row.status === 0
                        ? "Pending"
                        : row.status === 1
                        ? "Success"
                        : row.status === 2
                        ? "Canceled"
                        : "Unknown"}
                </span>
            ),
        },
        {
            name: "Date",
            selector: (row) =>
                new Intl.DateTimeFormat("id-ID", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                }).format(new Date(row.created_at)),
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="flex flex-col">
                    <div className="block mb-2 md:mb-4 md:gap-2 enter gap-y-2 md:gap-x-4 mt-2">
                        <ModalUpdate id={`${row.id}`} s={row} />
                    </div>
                    <div className="block mb-2 md:mb-4 md:gap-2 enter gap-y-2 md:gap-x-4">
                        <ModalDelete id={`${row.id}`} s={row} />
                    </div>
                </div>
            ),
        },
    ];

    // Filter data based on the search input
    const filteredData = orders.filter((order) => {
        // Convert all fields to strings and check if they include the search string
        const orderNumber = order.order_number?.toString().toLowerCase() || "";
        const userName = order.user?.name?.toString().toLowerCase() || "";
        const categoryTitle =
            order.category?.title?.toString().toLowerCase() || "";
        const productTitle =
            order.product?.title?.toString().toLowerCase() || "";

        return (
            orderNumber.includes(search.toLowerCase()) ||
            userName.includes(search.toLowerCase()) ||
            categoryTitle.includes(search.toLowerCase()) ||
            productTitle.includes(search.toLowerCase())
        );
    });

    // Define table styles (optional)
    const customStyles = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "14px",
            },
        },
        cells: {
            style: {
                fontSize: "13px",
            },
        },
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-teal-500 mb-1">
                            Purchase Orders
                        </h1>
                        <p className="text-gray-400 text-base">
                            Manage all your purchase orders here.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Export Button for admin */}
                        {auth.user && auth.user.role === 1 && (
                            <a
                                href="/export/purchase-orders"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-bold shadow-lg hover:bg-green-700 transition text-lg border border-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                                title="Export Purchase Orders as CSV"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                Export CSV
                            </a>
                        )}
                    </div>
                </div>
            }
        >
            <Head title="Purchase Orders Dashboard" />
            <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-lg font-bold mb-4">
                                Purchase Orders Dashboard
                            </h2>
                            <input
                                type="text"
                                placeholder="Search orders..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="border rounded px-2 py-1 mb-4"
                            />
                            <DataTable
                                columns={columns}
                                data={filteredData} // Pass the filtered data to the table
                                pagination // Enable pagination
                                highlightOnHover // Highlight rows on hover
                                customStyles={customStyles} // Optional custom styles
                                responsive // Make table responsive
                                striped // Add striped row styling
                                defaultSortField="id" // Default sorting field
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
