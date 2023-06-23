import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import FriendActionButton from './FriendActionButton';
import { Link } from '@inertiajs/react';



const FriendCard = ({ user }) => {


    const handleRemoveFriend = () => {
        Inertia.delete(`/friendship/remove/${user.id}`);
    };
    return (
        <div className="flex items-center justify-between px-4 py-2">
            <Link href={`/users/${user.id}`}>
                <div className="flex items-center space-x-4">
                    <div
                        className="bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400 bg-origin-padding w-16 h-16 rounded-full"
                        style={{ backgroundImage: `url(storage/${user.avatar})` }}
                    ></div>
                    <div>
                        <h2 className="text-lg font-bold">{user.name}</h2>
                        <p className="text-gray-500">@{user.username}</p>
                    </div>
                </div>
            </Link>
            <div className="space-x-2">
                <FriendActionButton
                    label="Message"
                    color="purple"
                // action={() => onMessage(user.id)}
                />
                
                <FriendActionButton
                    label="Remove Friend"
                    color="red"
                    action={() => handleRemoveFriend()}
                />
            </div>
        </div>
    );
};

export default FriendCard;
