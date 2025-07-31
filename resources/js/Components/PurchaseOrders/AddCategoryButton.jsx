import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";

export default function AddCategoryButton({ className = "", disabled }) {
    const { data, setData, reset, errors, processing } = useForm({
        status: "", // Ensure this is set as a string
        image: null, // Set this to null to handle file
        title: "",
    });

    const handleImageChange = (e) => {
        setData("image", e.target.files[0]); // Store file object
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("status", data.status); // Make sure status is included
        formData.append("image", data.image); // Add image file
        formData.append("title", data.title); // Add title

        // Check if data is being appended correctly
        console.log("Status:", data.status);
        console.log("Form Data:", formData);

        router.post("/addCategory", formData, {
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
                Add Category
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

                            {/* Status */}
                            <div>
                                <InputLabel htmlFor="status" value="Status" />
                                <select
                                    id="status"
                                    className="mt-1 block w-full"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                                <InputError
                                    className="mt-2"
                                    message={errors.status}
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
