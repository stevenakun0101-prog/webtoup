import { useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function ModalDelete({ id, s, children }) {
    if (!s || !s.id) return <span className="text-red-500">Invalid data</span>;
    const {
        data: deleteData,
        setData: setDeleteData,
        processing,
        reset,
    } = useForm({
        id: id,
        status: s.status,
        image: s.image,
        title: s.title,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post(`/deleteProducts/${deleteData.id}`, {
            _method: "delete",
            ...deleteData,
        });
    };

    return (
        <>
            {children ? (
                <span
                    onClick={() =>
                        document.getElementById(`${s.id}`).showModal()
                    }
                    style={{ display: "inline-block", cursor: "pointer" }}
                >
                    {children}
                </span>
            ) : (
                <button
                    onClick={() =>
                        document.getElementById(`${s.id}`).showModal()
                    }
                    className={`inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 focus:bg-red-800 active:bg-red-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 `}
                >
                    Delete
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
                            Are you sure you want to delete {deleteData.title}{" "}
                            Details?
                            <small className="block">id: {deleteData.id}</small>
                        </h3>
                        <form
                            onSubmit={handleSubmit}
                            className="mt-6 space-y-6"
                        >
                            <button
                                className={`w-full text-center items-center px-4 py-2 bg-red-600 hover:bg-red-700 focus:bg-red-800 active:bg-red-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150`}
                                disabled={processing}
                            >
                                Confirm Delete
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
