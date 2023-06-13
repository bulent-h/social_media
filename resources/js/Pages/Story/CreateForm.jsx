import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInputRounded from '@/Components/TextInputRounded';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useState, useEffect } from 'react';

export default function UpdateProfileInformation({ className = '' }) {
    const user = usePage().props.auth.user;
    const [fileType, setFileType] = useState();

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        content: null,
        file: null,
        type: null,
    });
    const [fileUrl, setFileUrl] = useState();

    function handleFileChange(e) {
        var tmp = e.target.files[0];
        checkType(tmp);

        setData('file', e.target.files[0])
        // setData('type',fileType);

        setFileUrl(
            URL.createObjectURL(tmp)
        );
    }
    function checkType(uploadedFile) {
        const file = uploadedFile;
        if (file) {
            const imageTypes = ['.jpeg', '.jpg', '.png', '.gif'];
            const videoTypes = ['.mp4', '.webm'];

            const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

            if (imageTypes.includes(fileExtension)) {
                console.log('Uploaded file is an image');
                setFileType('image');
            } else if (videoTypes.includes(fileExtension)) {
                console.log('Uploaded file is an video');
                setFileType('video');

            } else {
                console.log('Uploaded file is not an image');
            }
        }
    }
    function handleRemoveFile() {
        setFileUrl();
        setData('file', null);
        document.getElementById("file").value = null;

    }
    const submit = (e) => {
        e.preventDefault();
        data.type=fileType;
        post(route('story.store'));

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

                            <InputLabel className="font-semibold" htmlFor="content" value="Content" />
                        </div>
                        <TextInputRounded
                            id="content"
                            className="mt-1 block w-full col-span-7 col-start-5"
                            value={data.name}
                            onChange={(e) => setData('content', e.target.value)}
                            required
                            isFocused
                            autoComplete="content"
                        />

                        <InputError className="mt-2" message={errors.content} />
                    </div>


                    <div className='my-4 col-span-12 grid grid-cols-12 gap-4'>
                        <div className='col-start-2 col-span-2 flex items-center justify-start '>
                            <InputLabel className="font-semibold" value="Upload A Story" ></InputLabel>
                        </div>
                        <input id="file" type="file" className="sr-only"
                            onChange={handleFileChange} />


                        <div className='col-span-7 col-start-5'>
                            {
                                (fileUrl) &&
                                <div className='flex items-center'>
                                    <div className='relative  w-full'>
                                        <div className='flex items-center justify-center'>
                                            <div className='absolute top-0 right-0 hover:bg-red-500 rounded-full'>
                                                <button id="removeBtn" type='button' onClick={handleRemoveFile} className="text-red-500 dark:text-red-500 hover:text-gray-200 mx-1">&#10005;</button>
                                            </div>

                                            {(fileUrl && fileType == 'image') &&
                                                <div
                                                    className=" bg-contain bg-no-repeat bg-center bg-gray-200 dark:bg-gray-700   bg-origin-padding w-full h-96 rounded-lg"
                                                    style={{ backgroundImage: 'url(' + fileUrl + ')' }}>
                                                </div>
                                            }

                                            {
                                                (fileUrl && fileType == 'video') &&
                                                <video
                                                    className=" bg-center bg-cover bg-no-repeat bg-origin-padding w-full h-96 rounded-lg"
                                                    src={fileUrl} controls autoPlay />
                                            }

                                        </div>
                                    </div>
                                </div>

                            }


                            {
                                (fileUrl == null)
                                &&
                                <label htmlFor="file" className=" w-full block">

                                    <div className='flex items-center'>
                                        <div
                                            className=" bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-700  bg-origin-padding w-full h-96 rounded-lg flex items-center justify-center"
                                        >
                                            <div className='opacity-25' style={{ fontSize: '70px' }}>✚</div>
                                        </div>
                                    </div>
                                </label>

                            }

                        </div>
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
        </section >
    );
}
