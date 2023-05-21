import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />



            {status && <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">{status}</div>}

            <form onSubmit={submit}>
                <div className="mt-6">
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={data.email}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                </div>

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-6">
                    <div className="flex items-center justify-center ">
                        <PrimaryButton className="px-4 py-2" disabled={processing}>
                            Send Reset Link
                        </PrimaryButton>
                    </div>
                </div>

                <div className="flex align-bottom justify-center mt-6">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-transparent align-bottom"
                    >
                        Go back to login
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
