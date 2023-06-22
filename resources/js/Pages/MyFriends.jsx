import React from 'react';
import { Head } from '@inertiajs/react';
import FriendCard from './MyFriends/FriendCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const MyFriends = ({ auth, friends }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="My Friends" />
            <div className='flex border-b-2 border-gray-100 items-center'>
                <h1 className="text-2xl font-bold m-6 text-purple-700 ">My Friends</h1>
            </div>
            <div className="space-y-4">
                {friends.map(friend => (
                    <FriendCard
                        key={friend.id}
                        user={friend}
                    />
                ))}
            </div>
        </AuthenticatedLayout>
    );
};

export default MyFriends;