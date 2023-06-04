import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const UserShow = () => {
    const { user, auth, authUserSentFriendRequest, authUserReceivedFriendRequest, isFriends } = usePage().props;

    const handleAddFriend = () => {
        Inertia.post(`/friendship/send/${user.id}`);
    };

    const handleRemoveFriend = () => {
        Inertia.delete(`/friendship/remove/${user.id}`);
    };

    const handleCancelFriendRequest = () => {
        Inertia.post(`/friendship/cancel/${user.id}`);
    };

    const handleAcceptFriendRequest = () => {
        Inertia.post(`/friendship/accept/${user.id}`);
    };

    const handleRejectFriendRequest = () => {
        Inertia.post(`/friendship/reject/${user.id}`);
    };

    return (
        <AuthenticatedLayout>
            <Head title={`${user.name}'s Profile`} />
            <div className="flex flex-col items-center mt-6">
                <div
                    className="bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400 bg-origin-padding w-32 h-32 rounded-full mb-4"
                    style={{ backgroundImage: `url(/storage/${user.avatar})` }}
                ></div>
                <h1 className="text-2xl font-bold mb-2">{user.username}</h1>
                <p className="text-lg mb-4">{user.name}</p>
                <div className="flex space-x-4">
                    {
                        auth.id === user.id ? (
                            <button
                                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                                onClick={() => Inertia.visit('/profile')}
                            >
                                Edit Profile
                            </button>
                        ) : authUserReceivedFriendRequest ? (
                            <div className="flex space-x-4">
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                                    onClick={handleAcceptFriendRequest}
                                >
                                    Accept Friend Request
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                    onClick={handleRejectFriendRequest}
                                >
                                    Reject Friend Request
                                </button>
                            </div>
                        ) : authUserSentFriendRequest ? (
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                onClick={handleCancelFriendRequest}
                            >
                                Cancel Friend Request
                            </button>
                        ) : isFriends ? (
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                onClick={handleRemoveFriend}
                            >
                                Remove Friend
                            </button>
                        ) : (
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                onClick={handleAddFriend}
                            >
                                Add Friend
                            </button>
                        )
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UserShow;
