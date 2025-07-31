import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function ModalUpdate({ id, s, children }) {
    if (!s || !s.id) return <span className="text-red-500">Invalid data</span>;
    const {
        data: editData,
        setData: setEditData,
        errors,
        processing,
        reset,
    } = useForm({
        id: s.id,
        code: s.code,
        title: s.title,
        description: s.description,
        price: s.price,
        stock: s.stock,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post(`/updateProducts/${s.id}`, {
            _method: "patch",
            ...editData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    return (
        <>
            {children ? (
                <span
                    onClick={() =>
                        document.getElementById(`my_modal_3${s.id}`).showModal()
                    }
                    style={{ display: "inline-block", cursor: "pointer" }}
                >
                    {children}
                </span>
            ) : (
                <button
                    onClick={() =>
                        document.getElementById(`my_modal_3${s.id}`).showModal()
                    }
                    className={`inline-flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-600 active:bg-yellow-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 `}
                >
                    Edit
                </button>
            )}
            <dialog id={id} className="modal">
                <div className="modal-box bg-slate-50">
                    <div className="modal-header">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() => reset()}
                            >
                                ✕
                            </button>
                        </form>
                    </div>
                    <div className="modal-body">
                        <h3 className="font-bold text-lg">
                            Edit {s.first_name} Details
                            <small className="block">id: {editData.id}</small>
                        </h3>
                        <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                            className="mt-6 space-y-6"
                        >
                            {/* Code */}
                            <div>
                                <InputLabel htmlFor="code" value="Code" />

                                <TextInput
                                    id="code"
                                    className="mt-1 block w-full"
                                    value={editData.code}
                                    onChange={(e) =>
                                        setEditData("code", e.target.value)
                                    }
                                    required
                                    isFocused
                                    autoComplete="code"
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
                                    onChange={(e) =>
                                        setEditData("image", e.target.files[0])
                                    } // Set file image
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
                                    value={editData.title}
                                    onChange={(e) =>
                                        setEditData("title", e.target.value)
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
                                    value={editData.description}
                                    onChange={(e) =>
                                        setEditData(
                                            "description",
                                            e.target.value
                                        )
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
                                    value={editData.price}
                                    onChange={(e) =>
                                        setEditData("price", e.target.value)
                                    }
                                    required
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
                                    value={editData.stock}
                                    onChange={(e) =>
                                        setEditData("stock", e.target.value)
                                    }
                                    required
                                    autoComplete="stock"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.stock}
                                />
                            </div>

                            <button
                                className={`w-full text-center items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-600 active:bg-yellow-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150`}
                                disabled={processing}
                            >
                                Confirm Update
                            </button>
                        </form>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
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
