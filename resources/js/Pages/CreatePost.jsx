import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useRef } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function CreatePost({ auth }) {
    const [type, setType] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [pollOptions, setPollOptions] = useState(['', '']);
    const [pollQuestion, setPollQuestion] = useState('');
    const [preview, setPreview] = useState(null);

    const fileInput = useRef();

    const handleFileChange = (e) => {
        if (type === 'image' || type === 'video') {
            setPreview(URL.createObjectURL(e.target.files[0]));
            if (type === 'image') setImage(e.target.files[0]);
            if (type === 'video') setVideo(e.target.files[0]);
        }
    };

    const removeFile = () => {
        setPreview(null);
        fileInput.current.value = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('type', type);
        formData.append('content', content);
        if (image) formData.append('image_path', image);
        if (video) formData.append('video_path', video);
        if (type === 'poll') {
            formData.append('poll_question', pollQuestion);
            formData.append('poll_options', JSON.stringify(pollOptions));
        }

        Inertia.post('/posts', formData);
    };

    const addOption = () => {
        if (pollOptions.length < 5) setPollOptions([...pollOptions, '']);
    };

    const removeOption = () => {
        if (pollOptions.length > 2) setPollOptions(pollOptions.slice(0, -1));
    };

    // ...

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Post" />

            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-3xl ">
                <h1 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Create a new post</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Select post type
                        </label>
                        <select
                            value={type}
                            onChange={e => setType(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-200 border-gray-300 focus:outline-none focus:ring-purple-700 focus:border-purple-800 sm:text-sm rounded-full "
                        >
                            <option value="">-- Select post type --</option>
                            <option value="text">Text</option>
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                            <option value="poll">Poll</option>
                        </select>
                    </div>

                    {(type === 'text' || type === 'image' || type === 'video') && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Write your content
                            </label>
                            <textarea
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-4 text-base bg-gray-200 border-gray-300 focus:outline-none focus:ring-purple-700 focus:border-purple-800 sm:text-sm rounded-xl"
                            />
                        </div>
                    )}

                    {(type === 'image' || type === 'video') && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Choose your {type}
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    ref={fileInput}
                                    type="file"
                                    accept={`${type}/*`}
                                    onChange={handleFileChange}
                                    className="absolute w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="px-4 py-2 text-base text-center bg-gray-200 rounded-full flex justify-center items-center space-x-2 cursor-pointer">
                                    {(type === 'image') && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-photo-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M15 8h.01"></path>
                                            <path d="M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5"></path>
                                            <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4"></path>
                                            <path d="M14 14l1 -1c.67 -.644 1.45 -.824 2.182 -.54"></path>
                                            <path d="M16 19h6"></path>
                                            <path d="M19 16v6"></path>
                                        </svg>
                                    )}
                                    {(type === 'video') && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-video-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z"></path>
                                            <path d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
                                            <path d="M7 12l4 0"></path>
                                            <path d="M9 10l0 4"></path>
                                        </svg>
                                    )}
                                    <span>{preview ? 'Change file' : `Upload ${type}`}</span>
                                </div>
                                {preview && (
                                    <div className="mt-2 relative flex justify-center items-center">
                                        {type === 'image' && <img src={preview} alt="Preview" className="h-60 w-auto" />}
                                        {type === 'video' && <video src={preview} className="h-60 w-auto" controls />}
                                        <button type="button" onClick={removeFile} className="absolute top-0 right-0 text-red-600 rounded-full p-1 font-bold">X</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {type === 'poll' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Create your poll
                            </label>

                            <input
                                type="text"
                                value={pollQuestion}
                                onChange={e => setPollQuestion(e.target.value)}
                                placeholder="Question"
                                className="mt-1 mb-4 block w-full pl-3 pr-10 py-2 text-base bg-gray-200 border-gray-300 focus:outline-none focus:ring-purple-700 focus:border-purple-800 sm:text-sm rounded-lg"
                            />
                            {pollOptions.map((option, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={option}
                                    onChange={e => {
                                        const newOptions = [...pollOptions];
                                        newOptions[index] = e.target.value;
                                        setPollOptions(newOptions);
                                    }}
                                    placeholder={`Option ${index + 1}`}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-200 border-gray-300 focus:outline-none focus:ring-purple-700 focus:border-purple-800 sm:text-sm rounded-lg"
                                />
                            ))}
                            <div className="flex space-x-2 mt-4">
                                <button type="button" onClick={addOption} className="px-3 py-2 rounded-md text-sm font-medium text-purple-700 hover:hover:scale-105 focus:outline-none dark:text-white">Add option</button>
                                <button type="button" onClick={removeOption} className="px-3 py-2 rounded-md text-sm font-medium text-purple-700 hover:hover:scale-105 focus:outline-none dark:text-white">Remove option</button>
                            </div>
                        </div>
                    )}

                    <div className='flex justify-end'>
                        <button type="submit" className="px-5 py-2 rounded-full text-sm font-medium text-white bg-purple-700 hover:bg-indigo-800 focus:outline-none">Create post</button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
