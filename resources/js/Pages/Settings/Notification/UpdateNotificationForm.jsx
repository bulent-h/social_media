import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useState } from 'react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: user.name,

    });



    const submit = (e) => {
        e.preventDefault();
        // post(route('notification.update'));
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

                            <InputLabel className="font-semibold" htmlFor="reactions" value="Likes and reactions" />
                        </div>
                        <div className='col-end-12 col-span-2 flex items-center justify-end'>
                            <SelectInput
                                id="reactions"
                                className="mt-1 w-24 font-semibold text-sm "
                                value={data.reactions}
                                defualtValue='Off'
                            // onChange={(e) => setData('reactions', e.target.value)}
                            >
                                <option value="On" >On</option>

                            </SelectInput>
                        </div>


                        <InputError className="mt-2" message={errors.reactions} />
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
