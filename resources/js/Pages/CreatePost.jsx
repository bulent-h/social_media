import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function CreatePost({ auth }) {
    const [type, setType] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [pollOptions, setPollOptions] = useState(['', '']);
    const [pollQuestion, setPollQuestion] = useState('');

    const handleFileChange = (e) => {
        if (type === 'image') setImage(e.target.files[0]);
        if (type === 'video') setVideo(e.target.files[0]);
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

            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-3xl">
                <h1 className="mb-6 text-2xl font-semibold text-gray-900">Create a new post</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Select post type
                        </label>
                        <select
                            value={type}
                            onChange={e => setType(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-200 border-gray-300 focus:outline-none focus:ring-purple-700 focus:border-purple-800 sm:text-sm rounded-full"
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
                            <label className="block text-sm font-medium text-gray-700">
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
                            <label className="block text-sm font-medium text-gray-700">
                                Choose your {type}
                            </label>
                            <input
                                type="file"
                                accept={`${type}/*`}
                                onChange={handleFileChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base   border-gray-300 focus:outline-none focus:ring-purple-700 focus:border-purple-800 sm:text-sm rounded-full"
                            />
                        </div>
                    )}

                    {type === 'poll' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
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
                                <button type="button" onClick={addOption} className="px-3 py-2 rounded-md text-sm font-medium text-purple-700 hover:hover:scale-105 focus:outline-none">Add option</button>
                                <button type="button" onClick={removeOption} className="px-3 py-2 rounded-md text-sm font-medium text-purple-700 hover:hover:scale-105 focus:outline-none">Remove option</button>
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
