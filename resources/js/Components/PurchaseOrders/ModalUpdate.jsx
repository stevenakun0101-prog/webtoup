import { useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function ModalUpdate({ id, s, children }) {
    const {
        data: updateData,
        setData: setupdateData,
        processing,
        reset,
    } = useForm({
        id: id,
        title: s.title,
        image: s.image,
        status: s.status,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post(`/updatePurchaseOrders/${updateData.id}`, {
            _method: "patch",
            ...updateData,
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
                    className={`inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-700 focus:bg-green-800 active:bg-green-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 `}
                >
                    Confirm
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
                            Are you sure you want to update{" "}
                            {updateData.order_number} ?
                            <small className="block">id: {updateData.id}</small>
                        </h3>
                        <form
                            onSubmit={handleSubmit}
                            className="mt-6 space-y-6"
                        >
                            <button
                                className={`w-full text-center items-center px-4 py-2 bg-green-600 hover:bg-green-700 focus:bg-green-800 active:bg-green-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150`}
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
