import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInputRounded from '@/Components/TextInputRounded';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            {/* <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Update Password</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header> */}

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div className='grid grid-cols-12 gap-4'>
                    <div className='my-4 col-span-12 grid grid-cols-12 gap-4'>
                        <div className='col-start-2 col-span-2 flex items-center justify-start '>

                            <InputLabel className="font-semibold" htmlFor="current_password" value="Current Password" />
                        </div>
                        <TextInputRounded
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            type="password"
                            className="mt-1 block w-full col-span-7 col-start-5"
                            autoComplete="current-password"
                        />

                        <InputError message={errors.current_password} className="mt-2" />
                    </div>

                    <div className='my-4 col-span-12 grid grid-cols-12 gap-4'>
                        <div className='col-start-2 col-span-2 flex items-center justify-start '>
                            <InputLabel className="font-semibold" htmlFor="password" value="New Password" />

                        </div>

                        <TextInputRounded
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            className="mt-1 block w-full col-span-7 col-start-5"
                            autoComplete="new-password"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className='my-4 col-span-12 grid grid-cols-12 gap-4'>
                        <div className='col-start-2 col-span-2 flex items-center justify-start '>

                            <InputLabel className="font-semibold" htmlFor="password_confirmation" value="Confirm Password" />
                        </div>

                        <TextInputRounded
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            type="password"
                            className="mt-1 block w-full col-span-7 col-start-5"
                            autoComplete="new-password"
                        />

                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className='my-4 col-span-12 grid grid-cols-12 gap-4'>
                        <div className='col-end-12 col-span-2 flex items-center justify-end '>

                            <PrimaryButton disabled={processing}>Save</PrimaryButton>
                        </div>
                        <Transition
                            show={recentlySuccessful}
                            enterFrom="opacity-0"
                            leaveTo="opacity-0"
                            className="transition ease-in-out"
                        >
                            <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                        </Transition>
                    </div>
                </div>

            </form>
        </section>
    );
}
