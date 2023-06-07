import InputError from '@/Components/InputError';
import InputLabel  from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInputRounded from '@/Components/TextInputRounded';
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
            {/* <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Profile Information</h2>

            </header> */}

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className='grid grid-cols-12 gap-4'>

                    <div className='my-4 col-span-12 grid grid-cols-12 gap-4'>
                        <div className='col-start-2 col-span-2 flex items-center justify-start '>

                            <InputLabel className="font-semibold"  htmlFor="file" value="Profile Photo" />
                        </div>

                        <div className='col-span-7 col-start-5'>
                            <div className='flex items-center justify-start'>
                                {
                                    (fileUrl)
                                        ?
                                        <div className='relative'>
                                            <div className='flex items-center justify-center'>
                                                <div className="p-4 m-2 bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400 bg-origin-padding border-4 border-dashed w-32 h-32 rounded-full" style={{ backgroundImage: 'url(' + fileUrl + ')' }}></div>
                                                <div className='absolute top-0 right-0'>
                                                    <button id="removeBtn" type='button' onClick={handleRemoveFile} className="text-red-500 dark:text-red-500 text-sm hover:bg-gray-400 rounded-xl">X</button>
                                                </div>
                                            </div>
                                        </div>

                                        // <div className='flex items-center justify-center'>
                                        //     <div className=" p-4 m-2 bg-center bg-cover bg-no-repeat bg-gray-200  dark:bg-gray-400  bg-origin-padding  border-4 border-dashed w-32 h-32 rounded-full " style={{ backgroundImage: 'url(' + fileUrl + ')' }}>
                                        //     </div>
                                        //     <div className=' h-32' >
                                        //         <button id="removeBtn" type='button' onClick={handleRemoveFile} className=" text-red-500 dark:text-red-500 text-sm hover:bg-gray-400 rounded-xl " >X</button>
                                        //     </div>
                                        //     {/* <img id="preview" className="w-20 h-20 border-none opacity-75 " src={fileUrl} /> */}
                                        // </div>
                                        :
                                        <div className='flex items-center'>

                                            <div className="p-4 m-2 bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-700  bg-origin-padding w-32 h-32 rounded-full" style={{ backgroundImage: 'url(' + 'storage/' + data.avatar + ')' }}></div>
                                        </div>
                                }
                                <div className='ml-8'>
                                    <InputLabel className="font-semibold"  htmlFor="file" value="Change Profile Photo"
                                    />
                                    <input id="file" type="file" className="sr-only"
                                        onChange={handleFileChange} />

                                    <button id="deleteAvatar" type='button' onClick={handleRemoveAvatar}
                                    className="text-red-500 dark:text-red-500 text-sm hover:bg-gray-100 rounded-xl py-1 "
                                    // className='mt-2 inline-flex ml-4 items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'
                                    >Remove</button>

                                    <InputError className="mt-2" message={errors.file} />

                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='my-4 col-span-12 grid grid-cols-12 gap-4'>
                        <div className='col-start-2 col-span-2 flex items-center justify-start '>

                            <InputLabel className="font-semibold"  htmlFor="name" value="Name" />
                        </div>
                        <TextInputRounded
                            id="name"
                            className="mt-1 block w-full col-span-7 col-start-5"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className='my-4 col-span-12 grid grid-cols-12 gap-4'>

                        <div className='col-start-2 col-span-2 flex items-center justify-start '>
                            <InputLabel className="font-semibold"  htmlFor="username" value="Username" />
                        </div>
                        <TextInputRounded
                            id="username"
                            className="mt-1 block w-full col-span-7 col-start-5"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            required
                            isFocused
                            autoComplete="username"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className='my-4 col-span-12 grid grid-cols-12 gap-4'>
                        <div className='col-start-2 col-span-2 flex items-center justify-start '>

                            <InputLabel className="font-semibold"  htmlFor="email" value="Email"  />
                        </div>
                        <TextInputRounded
                            id="email"
                            type="email"
                            className="mt-1 block w-full col-span-7 col-start-5"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    <div className='my-4 col-span-12 grid grid-cols-12 gap-4'>
                        <div className='col-end-12 col-span-2 flex items-center justify-end '>
                            <PrimaryButton disabled={processing}>Save</PrimaryButton>
                        </div>
                        <Transition
                            show={recentlySuccessful}
                            enterFrom="opacity-0"
                            leaveTo="opacity-0"
                            className="transition ease-in-out "
                        >
                            <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                        </Transition>
                    </div>
                </div>

            </form>
        </section>
    );
}
