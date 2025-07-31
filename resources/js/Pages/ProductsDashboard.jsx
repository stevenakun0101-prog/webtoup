import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import AddProductButton from "@/Components/Products/AddProductButton";
import ModalUpdate from "@/Components/Products/ModalUpdate";
import ModalDelete from "@/Components/Products/ModalDelete";
import DataTable from "react-data-table-component";
import { PlusIcon, CubeIcon, TagIcon } from "@heroicons/react/24/outline";
import { useEffect, useState, useMemo, useRef } from "react";
import { router, usePage } from "@inertiajs/react";

export default function ProductsDashboard({
    auth,
    ProductsData,
    count,
    categories,
}) {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const searchInputRef = useRef(null);
    const { flash } = usePage().props;
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        if (flash && (flash.message || flash.error)) {
            setNotification(flash.message || flash.error);
            const timeout = setTimeout(() => setNotification(null), 4000);
            return () => clearTimeout(timeout);
        }
    }, [flash]);

    // Hitung total stok
    const totalStock = ProductsData.reduce(
        (acc, p) => acc + (parseInt(p.stock) || 0),
        0
    );
    // Hitung total kategori unik
    const totalCategories = categories ? categories.length : 0;

    // DataTable columns
    const columns = useMemo(
        () => [
            {
                name: "#",
                selector: (row, i) => i + 1,
                width: "60px",
                sortable: false,
            },
            {
                name: "Code",
                selector: (row) => row.code,
                sortable: true,
            },
            {
                name: "Category",
                selector: (row) => row.category,
                sortable: true,
            },
            {
                name: "Image",
                cell: (row) => (
                    <img
                        src={row.image_url}
                        alt={row.title}
                        className="w-12 h-12 object-cover rounded shadow"
                    />
                ),
                width: "70px",
            },
            {
                name: "Title",
                selector: (row) => row.title,
                sortable: true,
            },
            {
                name: "Description",
                selector: (row) => row.description,
                sortable: false,
                grow: 2,
                wrap: true,
            },
            {
                name: "Price",
                selector: (row) => row.price,
                sortable: true,
                cell: (row) => (
                    <span className="font-semibold text-teal-600">
                        {row.price}
                    </span>
                ),
            },
            {
                name: "Stock",
                selector: (row) => row.stock,
                sortable: true,
            },
            {
                name: "Actions",
                cell: (row) => (
                    <div className="flex gap-2">
                        <ModalUpdate id={`update_${row.id}`} s={row}>
                            <span className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-yellow-400 text-white font-bold shadow hover:bg-yellow-500 transition text-sm cursor-pointer">
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m2 2l-6 6m2 2l-6 6"
                                    />
                                </svg>
                                Edit
                            </span>
                        </ModalUpdate>
                        <ModalDelete id={`delete_${row.id}`} s={row}>
                            <span className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-red-500 text-white font-bold shadow hover:bg-red-600 transition text-sm cursor-pointer">
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                                Delete
                            </span>
                        </ModalDelete>
                    </div>
                ),
                ignoreRowClick: true,
                width: "120px",
            },
        ],
        []
    );

    // Filtered data
    const filteredData = useMemo(() => {
        if (!search) return ProductsData;
        return ProductsData.filter(
            (row) =>
                row.title?.toLowerCase().includes(search.toLowerCase()) ||
                row.code?.toLowerCase().includes(search.toLowerCase()) ||
                row.category?.toLowerCase().includes(search.toLowerCase())
        );
    }, [ProductsData, search]);

    // Custom styles for DataTable
    const customStyles = {
        headCells: {
            style: {
                backgroundColor: "#0f172a",
                color: "#38bdf8",
                fontWeight: "bold",
                fontSize: "1rem",
            },
        },
        rows: {
            style: {
                backgroundColor: "#fff",
                color: "#222",
                fontSize: "0.98rem",
                minHeight: "56px",
            },
            stripedStyle: {
                backgroundColor: "#f1f5f9",
            },
        },
        pagination: {
            style: {
                backgroundColor: "#fff",
                color: "#222",
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
                            Products
                        </h1>
                        <p className="text-gray-400 text-base">
                            Manage all your products here.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block">
                            <AddProductButton>
                                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-teal-500 text-white font-semibold shadow-lg hover:bg-teal-600 transition text-base">
                                    <PlusIcon className="h-5 w-5" /> Add Product
                                </span>
                            </AddProductButton>
                        </div>
                        {/* Export Button for admin */}
                        {auth.user && auth.user.role === 1 && (
                            <a
                                href="/export/products"
                                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 transition text-base border border-green-700"
                                title="Export Products to CSV"
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
            <Head title="Products Dashboard" />
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    {/* Summary cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10 w-full">
                        <div className="bg-white rounded-3xl shadow-2xl flex items-center gap-6 p-8 border-l-8 border-teal-500 w-full">
                            <CubeIcon className="h-12 w-12 text-teal-500" />
                            <div>
                                <div className="text-xl font-bold text-teal-700">
                                    Total Products
                                </div>
                                <div className="text-4xl font-bold">
                                    {count}
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl shadow-2xl flex items-center gap-6 p-8 border-l-8 border-sky-500 w-full">
                            <TagIcon className="h-12 w-12 text-sky-500" />
                            <div>
                                <div className="text-xl font-bold text-sky-700">
                                    Total Categories
                                </div>
                                <div className="text-4xl font-bold">
                                    {totalCategories}
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl shadow-2xl flex items-center gap-6 p-8 border-l-8 border-yellow-500 w-full">
                            <PlusIcon className="h-12 w-12 text-yellow-500" />
                            <div>
                                <div className="text-xl font-bold text-yellow-700">
                                    Total Stock
                                </div>
                                <div className="text-4xl font-bold">
                                    {totalStock}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full">
                        {/* Notifikasi global */}
                        {notification && (
                            <div className="mb-4 p-4 rounded bg-green-100 text-green-700 font-bold text-center">
                                {notification}
                            </div>
                        )}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                            <div className="flex-1 flex items-center gap-2">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search products..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        searchInputRef.current?.focus();
                                    }}
                                    className="border border-teal-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-400 focus:outline-none w-full sm:w-80 shadow bg-gray-50 text-lg"
                                />
                                <span className="text-base text-gray-400 ml-2">
                                    {filteredData.length} result(s)
                                </span>
                            </div>
                            <div className="block sm:hidden mt-4">
                                <AddProductButton>
                                    <span className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-teal-500 text-white font-bold shadow-lg hover:bg-teal-600 transition text-lg">
                                        <PlusIcon className="h-6 w-6" /> Add
                                        Product
                                    </span>
                                </AddProductButton>
                            </div>
                        </div>
                        <hr className="mb-6 border-t border-gray-200" />
                        <div className="overflow-x-auto rounded-2xl">
                            <DataTable
                                columns={columns.map((col) =>
                                    col.name === "Actions"
                                        ? {
                                              ...col,
                                              cell: (row) => {
                                                  if (!row || !row.id) {
                                                      return (
                                                          <span className="text-red-500">
                                                              Invalid row
                                                          </span>
                                                      );
                                                  }
                                                  return (
                                                      <div className="flex gap-2">
                                                          <ModalUpdate
                                                              id={`update_${row.id}`}
                                                              s={row}
                                                          >
                                                              <button
                                                                  className="group relative p-2 rounded-full bg-yellow-400 hover:bg-yellow-500 shadow transition"
                                                                  title="Edit"
                                                                  onClick={(
                                                                      e
                                                                  ) => {
                                                                      e.stopPropagation();
                                                                      try {
                                                                          document
                                                                              .getElementById(
                                                                                  `update_${row.id}`
                                                                              )
                                                                              .showModal();
                                                                      } catch (err) {
                                                                          alert(
                                                                              "Gagal buka modal edit!"
                                                                          );
                                                                      }
                                                                  }}
                                                              >
                                                                  {/* Pencil Icon */}
                                                                  <svg
                                                                      className="h-5 w-5 text-white"
                                                                      fill="none"
                                                                      stroke="currentColor"
                                                                      strokeWidth="2"
                                                                      viewBox="0 0 24 24"
                                                                  >
                                                                      <path
                                                                          strokeLinecap="round"
                                                                          strokeLinejoin="round"
                                                                          d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6"
                                                                      />
                                                                  </svg>
                                                                  <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                                                                      Edit
                                                                  </span>
                                                              </button>
                                                          </ModalUpdate>
                                                          <ModalDelete
                                                              id={`delete_${row.id}`}
                                                              s={row}
                                                          >
                                                              <button
                                                                  className="group relative p-2 rounded-full bg-red-500 hover:bg-red-600 shadow transition"
                                                                  title="Delete"
                                                                  onClick={(
                                                                      e
                                                                  ) => {
                                                                      e.stopPropagation();
                                                                      try {
                                                                          document
                                                                              .getElementById(
                                                                                  `delete_${row.id}`
                                                                              )
                                                                              .showModal();
                                                                      } catch (err) {
                                                                          alert(
                                                                              "Gagal buka modal delete!"
                                                                          );
                                                                      }
                                                                  }}
                                                              >
                                                                  {/* Trash Icon */}
                                                                  <svg
                                                                      className="h-5 w-5 text-white"
                                                                      fill="none"
                                                                      stroke="currentColor"
                                                                      strokeWidth="2"
                                                                      viewBox="0 0 24 24"
                                                                  >
                                                                      <path
                                                                          strokeLinecap="round"
                                                                          strokeLinejoin="round"
                                                                          d="M6 18L18 6M6 6l12 12"
                                                                      />
                                                                  </svg>
                                                                  <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                                                                      Delete
                                                                  </span>
                                                              </button>
                                                          </ModalDelete>
                                                      </div>
                                                  );
                                              },
                                          }
                                        : col
                                )}
                                data={filteredData}
                                progressPending={loading}
                                pagination
                                highlightOnHover
                                pointerOnHover
                                responsive
                                striped
                                customStyles={customStyles}
                                noDataComponent={
                                    <div className="text-gray-400 py-8 text-lg">
                                        No products found.
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </div>
                {/* Floating Add Button for mobile */}
                <div className="fixed bottom-6 right-6 z-40 sm:hidden">
                    <AddProductButton>
                        <span className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-teal-500 text-white font-bold shadow-2xl hover:bg-teal-600 transition text-xl">
                            <PlusIcon className="h-7 w-7" />
                        </span>
                    </AddProductButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
