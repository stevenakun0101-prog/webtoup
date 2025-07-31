import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Log in" />
            <div
                className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8"
                style={{ backgroundColor: "#14252d" }} // Updated background color
            >
                <div className="w-full max-w-md">
                    <Link href="/">
                        <div className="flex justify-center mb-6">
                            <img
                                src="/storage/images/cungsstore.jpeg"
                                alt="Cungstore Logo"
                                className="h-40"
                            />
                        </div>
                    </Link>
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-white">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-300">
                            Or{" "}
                            <Link
                                href="/register"
                                className="font-medium text-indigo-400 hover:text-indigo-300"
                            >
                                create a new account
                            </Link>
                        </p>
                    </div>

                    {status && (
                        <div className="mb-4 rounded-md bg-green-100 p-4 text-sm text-green-600">
                            {status}
                        </div>
                    )}

                    <form
                        onSubmit={submit}
                        className="mt-8 space-y-6 rounded-lg bg-white p-6 shadow-md"
                    >
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-6">
                            <PrimaryButton
                                className="w-full justify-center"
                                disabled={processing}
                            >
                                Log in
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
