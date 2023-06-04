import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useState } from 'react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        file: null
    });
    const [fileUrl, setFileUrl] = useState();

    function handleFileChange(e) {

        setData('file', e.target.files[0])
        var tmp = e.target.files[0];
        setFileUrl(
            URL.createObjectURL(tmp)
        );
    }
    function handleRemoveFile() {

        setFileUrl();
        setData('file', null);
        document.getElementById("file").value = null;

    }

    function handleRemoveAvatar() {

        setData('file', null);
        setData('avatar', null);

        console.log(data);

        setFileUrl();


    }

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    {
                        // (fileUrl)
                        // &&
                        <div className='items-center justify-center'>
                            <div>
                                {
                                    (fileUrl)
                                        ?
                                        <div className='flex items-center justify-center'>
                                            <div className=" p-4 m-2 bg-center bg-cover bg-no-repeat bg-gray-200  dark:bg-gray-400  bg-origin-padding  border-4 border-dashed w-32 h-32 rounded-full " style={{ backgroundImage: 'url(' + fileUrl + ')' }}>
                                            </div>
                                            <div className='w-32 h-32' >
                                                <button id="removeBtn" type='button' onClick={handleRemoveFile} className=" text-red-500 dark:text-red-500 text-sm hover:bg-gray-400 rounded-xl " >X</button>
                                            </div>
                                            {/* <img id="preview" className="w-20 h-20 border-none opacity-75 " src={fileUrl} /> */}
                                        </div>
                                        :
                                        <div className='flex items-center'>

                                            <div className="p-4 m-2 bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400  bg-origin-padding w-32 h-32 rounded-full" style={{ backgroundImage: 'url(' + 'storage/' + data.avatar + ')' }}></div>
                                        </div>
                                }
                            </div>
                        </div>
                    }

                    <div>


                        <InputLabel htmlFor="file" value="Upload"
                            className='mt-2 inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'
                        />
                        <input id="file" type="file" className="sr-only"
                            onChange={handleFileChange} />


                        <button id="deleteAvatar" type='button' onClick={handleRemoveAvatar}
                            // className=" text-red-500 dark:text-red-500 text-sm hover:bg-gray-400 rounded-xl p-1 mb-1"
                            className='mt-2 inline-flex ml-4 items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'
                        >Remove</button>

                        <InputError className="mt-2" message={errors.file} />

                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="username" value="Username" />

                    <TextInput
                        id="username"
                        className="mt-1 block w-full"
                        value={data.username}
                        onChange={(e) => setData('username', e.target.value)}
                        required
                        isFocused
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center justify-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out "
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
