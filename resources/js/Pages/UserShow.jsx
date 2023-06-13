import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const UserShow = () => {
    const { user, auth, authUserSentFriendRequest, authUserReceivedFriendRequest, isFriends, authUserHasBlocked, errors } = usePage().props;
    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    const handleAddFriend = () => {
        Inertia.post(`/friendship/send/${user.id}`).then(() => {
            // Check if there's an error and display it
            if(errors.block) {
                alert(errors.block);
            }
        });
    };

    const handleRemoveFriend = () => {
        Inertia.delete(`/friendship/remove/${user.id}`);
    };

    const handleCancelFriendRequest = () => {
        Inertia.post(`/friendship/delete/${user.id}`);
    };

    const handleAcceptFriendRequest = () => {
        Inertia.post(`/friendship/accept/${user.id}`);
    };

    const handleRejectFriendRequest = () => {
        Inertia.post(`/friendship/reject/${user.id}`);
    };

    const handleBlockUser = () => {
        Inertia.post(`/block/${user.id}`);
    };

    const handleUnblockUser = () => {
        Inertia.delete(`/unblock/${user.id}`);
    };

    const handleOpenDropdown = () => {
        setDropdownOpen(true);
    };

    const handleCloseDropdown = () => {
        setDropdownOpen(false);
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
                <div className="relative inline-block text-left">
                    <button type="button" className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-gray-800 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none" id="options-menu" aria-haspopup="true" aria-expanded="true" onClick={dropdownOpen ? handleCloseDropdown : handleOpenDropdown}>
                        •••
                    </button>

                    {dropdownOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                {authUserHasBlocked ? (
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" onClick={handleUnblockUser}>Unblock</a>
                                ) : (
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" onClick={handleBlockUser}>Block</a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
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
                        ) : authUserHasBlocked ? null : ( // <-- This line was added
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
