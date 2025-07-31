import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function AddProductButton({ className = "", disabled }) {
    const { data, setData, reset, errors, processing } = useForm({
        code: "",
        image: null, // Set this to null to handle file
        title: "",
        description: "",
        price: "",
        stock: "",
        category_id: "", // Add category_id for selection
    });

    const [categories, setCategories] = useState([]);

    // Fetch categories when component mounts
    useEffect(() => {
        fetch("/categories")
            .then((response) => response.json())
            .then((data) => setCategories(data));
    }, []);

    const handleImageChange = (e) => {
        setData("image", e.target.files[0]); // Store file object
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("code", data.code);
        formData.append("image", data.image); // Add image file
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("stock", data.stock);
        formData.append("category_id", data.category_id); // Add category_id

        router.post("/addProducts", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        document.getElementById("my_modal_2").close();
        reset();
    };

    return (
        <>
            <button
                onClick={() =>
                    document.getElementById("my_modal_2").showModal()
                }
                className={
                    `inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 focus:bg-green-800 active:bg-green-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${
                        disabled && "opacity-25"
                    } ` + className
                }
                disabled={disabled}
            >
                Add Product
            </button>

            <dialog id="my_modal_2" className="modal">
                <div className="modal-box bg-slate-50">
                    <div className="modal-header">
                        <form method="dialog">
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() => reset()}
                            >
                                ✕
                            </button>
                        </form>
                    </div>
                    <div className="modal-body">
                        <h3 className="font-bold text-lg">Add New Product</h3>
                        <form onSubmit={submit} className="mt-6 space-y-6">
                            {/* Code */}
                            <div>
                                <InputLabel htmlFor="code" value="Code" />
                                <TextInput
                                    id="code"
                                    className="mt-1 block w-full"
                                    value={data.code}
                                    onChange={(e) =>
                                        setData("code", e.target.value)
                                    }
                                    required
                                    isFocused
                                    autoComplete="code"
                                    min="4"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.code}
                                />
                            </div>

                            {/* Image */}
                            <div>
                                <InputLabel htmlFor="image" value="Image" />
                                <input
                                    type="file"
                                    id="image"
                                    className="mt-1 block w-full"
                                    onChange={handleImageChange} // Handle file input change
                                    required
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.image}
                                />
                            </div>

                            {/* Title */}
                            <div>
                                <InputLabel htmlFor="title" value="Title" />
                                <TextInput
                                    id="title"
                                    className="mt-1 block w-full"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    required
                                    isFocused
                                    autoComplete="title"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.title}
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <InputLabel
                                    htmlFor="description"
                                    value="Description"
                                />
                                <TextInput
                                    id="description"
                                    className="mt-1 block w-full"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    required
                                    isFocused
                                    autoComplete="description"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.description}
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <InputLabel htmlFor="price" value="Price" />
                                <TextInput
                                    id="price"
                                    className="mt-1 block w-full"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                    required
                                    isFocused
                                    autoComplete="price"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.price}
                                />
                            </div>

                            {/* Stock */}
                            <div>
                                <InputLabel htmlFor="stock" value="Stock" />
                                <TextInput
                                    id="stock"
                                    className="mt-1 block w-full"
                                    value={data.stock}
                                    onChange={(e) =>
                                        setData("stock", e.target.value)
                                    }
                                    required
                                    isFocused
                                    autoComplete="stock"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.stock}
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <InputLabel
                                    htmlFor="category"
                                    value="Category"
                                />
                                <select
                                    id="category"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                                    value={data.category_id}
                                    onChange={(e) =>
                                        setData("category_id", e.target.value)
                                    }
                                    required
                                >
                                    <option value="" disabled>
                                        Select a category
                                    </option>
                                    console.log(categories);
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.title}
                                        </option>
                                    ))}
                                </select>
                                <InputError
                                    className="mt-2"
                                    message={errors.category_id}
                                />
                            </div>

                            <button
                                className={`w-full text-center items-center px-4 py-2 bg-green-600 hover:bg-green-700 focus:bg-green-800 active:bg-green-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${
                                    disabled && "opacity-25"
                                }`}
                                disabled={processing}
                            >
                                Add New Product
                            </button>
                        </form>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button
                                className="btn text-black border-0 bg-gray-300 hover:bg-gray-400"
                                onClick={() => reset()}
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => reset()}></button>
                </form>
            </dialog>
        </>
    );
}
