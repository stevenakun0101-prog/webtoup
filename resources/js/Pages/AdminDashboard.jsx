import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    CubeIcon,
    TagIcon,
    ClipboardDocumentListIcon,
    UserIcon,
    PlusIcon,
    EyeIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboard({
    auth,
    ProductsCount = 0,
    CategoriesCount = 0,
    OrdersCount = 0,
    UsersCount = 0,
    LatestProducts = [],
    LatestOrders = [],
    OrdersPending = 0,
    OrdersSuccess = 0,
    OrdersCanceled = 0,
    LatestUsers = [],
    TopProducts = [],
}) {
    const user = usePage().props.auth.user;

    // Statistik cards
    const stats = [
        {
            name: "Products",
            value: ProductsCount,
            icon: <CubeIcon className="h-8 w-8 text-teal-500" />,
            color: "bg-white",
            href: route("productsdashboard.index"),
        },
        {
            name: "Categories",
            value: CategoriesCount,
            icon: <TagIcon className="h-8 w-8 text-teal-500" />,
            color: "bg-white",
            href: route("categorydashboard.index"),
        },
        {
            name: "Orders",
            value: OrdersCount,
            icon: (
                <ClipboardDocumentListIcon className="h-8 w-8 text-teal-500" />
            ),
            color: "bg-white",
            href: route("purchase_orders.index"),
        },
        {
            name: "Users",
            value: UsersCount,
            icon: <UserIcon className="h-8 w-8 text-teal-500" />,
            color: "bg-white",
            href: "#",
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-teal-500 mb-1">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-400 text-base">
                            Welcome back,{" "}
                            <span className="font-semibold text-teal-400">
                                {user.name}
                            </span>
                            !
                        </p>
                    </div>
                    <div className="flex gap-2 mt-4 sm:mt-0">
                        <Link
                            href={route("productsdashboard.index")}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500 text-white font-semibold shadow hover:bg-teal-600 transition"
                        >
                            <PlusIcon className="h-5 w-5" /> Add Product
                        </Link>
                        <Link
                            href={route("categorydashboard.index")}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 text-white font-semibold shadow hover:bg-sky-600 transition"
                        >
                            <PlusIcon className="h-5 w-5" /> Add Category
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Admin Dashboard" />
            <div className="py-6 px-2 sm:px-6 lg:px-8 w-full pl-2 sm:pl-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat) => (
                        <Link
                            key={stat.name}
                            href={stat.href}
                            className="group block rounded-xl shadow-lg p-6 bg-white hover:bg-teal-500 transition-all duration-200 border border-teal-100 hover:border-teal-500 cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0">{stat.icon}</div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-800 group-hover:text-white">
                                        {stat.value}
                                    </div>
                                    <div className="text-gray-500 group-hover:text-white text-lg font-semibold">
                                        {stat.name}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                {/* Order status summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 rounded-xl p-4 flex items-center gap-4">
                        <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
                        <div>
                            <div className="text-lg font-bold text-yellow-700">
                                Pending
                            </div>
                            <div className="text-2xl font-bold">
                                {OrdersPending}
                            </div>
                        </div>
                    </div>
                    <div className="bg-green-100 border-l-4 border-green-500 rounded-xl p-4 flex items-center gap-4">
                        <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                        <div>
                            <div className="text-lg font-bold text-green-700">
                                Success
                            </div>
                            <div className="text-2xl font-bold">
                                {OrdersSuccess}
                            </div>
                        </div>
                    </div>
                    <div className="bg-red-100 border-l-4 border-red-500 rounded-xl p-4 flex items-center gap-4">
                        <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                        <div>
                            <div className="text-lg font-bold text-red-700">
                                Canceled
                            </div>
                            <div className="text-2xl font-bold">
                                {OrdersCanceled}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Latest Orders */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-teal-600">
                                Latest Orders
                            </h2>
                            <Link
                                href={route("purchase_orders.index")}
                                className="text-teal-500 hover:underline font-semibold text-sm"
                            >
                                View All
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="text-gray-500 border-b">
                                        <th className="py-2 pr-4 text-left">
                                            Order #
                                        </th>
                                        <th className="py-2 pr-4 text-left">
                                            User
                                        </th>
                                        <th className="py-2 pr-4 text-left">
                                            Product
                                        </th>
                                        <th className="py-2 pr-4 text-left">
                                            Status
                                        </th>
                                        <th className="py-2 pr-4 text-left">
                                            Date
                                        </th>
                                        <th className="py-2 pr-4 text-left">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {LatestOrders.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="text-center text-gray-400 py-4"
                                            >
                                                No orders found.
                                            </td>
                                        </tr>
                                    )}
                                    {LatestOrders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="border-b hover:bg-slate-100"
                                        >
                                            <td className="py-2 pr-4 font-semibold">
                                                {order.order_number}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {order.user}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {order.product}
                                            </td>
                                            <td className="py-2 pr-4">
                                                <span
                                                    className={`inline-block px-2 py-1 rounded-full text-xs ${
                                                        order.status === 0
                                                            ? "bg-red-500 text-white"
                                                            : order.status === 1
                                                            ? "bg-green-500 text-white"
                                                            : order.status === 2
                                                            ? "bg-yellow-500 text-white"
                                                            : "bg-gray-500 text-white"
                                                    }`}
                                                >
                                                    {order.status === 0
                                                        ? "Pending"
                                                        : order.status === 1
                                                        ? "Success"
                                                        : order.status === 2
                                                        ? "Canceled"
                                                        : "Unknown"}
                                                </span>
                                            </td>
                                            <td className="py-2 pr-4">
                                                {new Date(
                                                    order.created_at
                                                ).toLocaleString()}
                                            </td>
                                            <td className="py-2 pr-4">
                                                <Link
                                                    href={route(
                                                        "purchase_orders.index"
                                                    )}
                                                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 hover:bg-teal-100 text-teal-600 text-xs font-semibold transition"
                                                >
                                                    <EyeIcon className="h-4 w-4" />{" "}
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Latest Products */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-sky-600">
                                Latest Products
                            </h2>
                            <Link
                                href={route("productsdashboard.index")}
                                className="text-sky-500 hover:underline font-semibold text-sm"
                            >
                                View All
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="text-gray-500 border-b">
                                        <th className="py-2 pr-4 text-left">
                                            Title
                                        </th>
                                        <th className="py-2 pr-4 text-left">
                                            Category
                                        </th>
                                        <th className="py-2 pr-4 text-left">
                                            Price
                                        </th>
                                        <th className="py-2 pr-4 text-left">
                                            Stock
                                        </th>
                                        <th className="py-2 pr-4 text-left">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {LatestProducts.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="text-center text-gray-400 py-4"
                                            >
                                                No products found.
                                            </td>
                                        </tr>
                                    )}
                                    {LatestProducts.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="border-b hover:bg-slate-100"
                                        >
                                            <td className="py-2 pr-4 font-semibold">
                                                {product.title}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {product.category}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {product.price}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {product.stock}
                                            </td>
                                            <td className="py-2 pr-4 flex gap-2">
                                                <Link
                                                    href={route(
                                                        "productsdashboard.index"
                                                    )}
                                                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 hover:bg-sky-100 text-sky-600 text-xs font-semibold transition"
                                                >
                                                    <EyeIcon className="h-4 w-4" />{" "}
                                                    View
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "productsdashboard.index"
                                                    )}
                                                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 hover:bg-yellow-100 text-yellow-600 text-xs font-semibold transition"
                                                >
                                                    <PencilSquareIcon className="h-4 w-4" />{" "}
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Top Products */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-indigo-600">
                                Top Products
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="text-gray-500 border-b">
                                        <th className="py-2 pr-4 text-left">
                                            Title
                                        </th>
                                        <th className="py-2 pr-4 text-left">
                                            Category
                                        </th>
                                        <th className="py-2 pr-4 text-left">
                                            Orders
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {TopProducts.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="text-center text-gray-400 py-4"
                                            >
                                                No data.
                                            </td>
                                        </tr>
                                    )}
                                    {TopProducts.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="border-b hover:bg-slate-100"
                                        >
                                            <td className="py-2 pr-4 font-semibold">
                                                {product.title}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {product.category}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {product.orders_count}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Latest Users */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-pink-600">
                                Latest Users
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="text-gray-500 border-b">
                                        <th className="py-2 pr-4 text-left">
                                            Name
                                        </th>
                                        <th className="py-2 pr-4 text-left">
                                            Email
                                        </th>
                                        <th className="py-2 pr-4 text-left">
                                            Joined
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {LatestUsers.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="text-center text-gray-400 py-4"
                                            >
                                                No users found.
                                            </td>
                                        </tr>
                                    )}
                                    {LatestUsers.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="border-b hover:bg-slate-100"
                                        >
                                            <td className="py-2 pr-4 font-semibold">
                                                {user.name}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {user.email}
                                            </td>
                                            <td className="py-2 pr-4">
                                                {new Date(
                                                    user.created_at
                                                ).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
