import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { format, formatDistanceToNow } from 'date-fns';
import Post from '@/Components/Post';

const UserShow = () => {
    const { user, auth, authUserSentFriendRequest, authUserReceivedFriendRequest, isFriends, authUserHasBlocked, errors, posts } = usePage().props;
    const [dropdownOpen, setDropdownOpen] = React.useState(false);



    const handleAddFriend = () => {
        Inertia.post(`/friendship/send/${user.id}`).then(() => {
            // Check if there's an error and display it
            if (errors.block) {
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
            <div className='flex border-b-2 border-gray-100 items-center'>
                <h1 className="text-2xl font-bold m-6 text-purple-700 ">{user.username}</h1>
            </div>
            <div className="flex flex-col justify-center md:flex md:flex-row items-center mt-6 md:justify-between border-b-2 border-gray-100 ">
                <div className='md:ml-6 flex flex-col justify-center'>
                    <div
                        className="bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400 bg-origin-padding w-24 h-24 rounded-full mb-4"
                        style={{ backgroundImage: `url(/storage/${user.avatar})` }}
                    >
                    </div>

                    <h1 className="text-xl font-bold mb-2">{user.name}</h1>
                    <p className="text-lg mb-4">{user.bio}</p>
                </div>
                <div className='flex items-center'>

                    <div className="space-x-4">
                        {
                            auth.id === user.id ? (
                                <button
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full"
                                    onClick={() => Inertia.visit('/profile')}
                                >
                                    Edit Profile
                                </button>
                            ) : authUserReceivedFriendRequest ? (
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-full"
                                        onClick={handleAcceptFriendRequest}
                                    >
                                        Accept Friend Request
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full"
                                        onClick={handleRejectFriendRequest}
                                    >
                                        Reject Friend Request
                                    </button>
                                </div>
                            ) : authUserSentFriendRequest ? (
                                <button
                                    className="bg-red-600 hover:bg-red-600 text-white py-2 px-4 rounded-full"
                                    onClick={handleCancelFriendRequest}
                                >
                                    Cancel Friend Request
                                </button>
                            ) : isFriends ? (
                                <button
                                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full"
                                    onClick={handleRemoveFriend}
                                >
                                    Remove Friend
                                </button>
                            ) : authUserHasBlocked ? null : (
                                <button
                                    className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full"
                                    onClick={handleAddFriend}
                                >
                                    Add Friend
                                </button>
                            )
                        }
                    </div>
                    <div className="relative inline-block text-left ">
                        <button type="button" className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-none text-sm font-medium text-gray-600 hover:text-black" id="options-menu" aria-haspopup="true" aria-expanded="true" onClick={dropdownOpen ? handleCloseDropdown : handleOpenDropdown}>
                            •••
                        </button>

                        {dropdownOpen && (
                            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    {authUserHasBlocked ? (
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" onClick={handleUnblockUser}>Unblock</a>
                                    ) : (
                                        <>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" onClick={handleBlockUser}>Block</a>

                                            <a href={route('chat',{selectedUser:user.id})} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                                Message
                                            </a>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {posts.map((singlePost) => <Post user={user} auth={auth} initialPost={singlePost} key={singlePost.id} />)}
        </AuthenticatedLayout>
    );
};

export default UserShow;
