import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';

export default function FriendRequests() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetch('/friend-requests')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setRequests(data);
            })
            .catch(error => console.error('There has been a problem with your fetch operation:', error));
    }, []);

    const handleAcceptRequest = (requestId) => {
        Inertia.post(`/friendship/accept/${requestId}`);
    };

    const handleRejectRequest = (requestId) => {
        Inertia.post(`/friendship/reject/${requestId}`);
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <h2 className="text-lg font-semibold mb-2 dark:text-white">Friend Requests</h2>
            {requests.map((request) => (
                <div key={request.id} className="flex items-center mb-2 space-x-4 p-2 border-b border-gray-100 dark:border-gray-500">
                    <div className='flex items-center'>
                        <Link href={`/users/${request.id}`} className="mr-2">
                            <div
                                className="bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400 bg-origin-padding w-10 h-10 rounded-full"
                                style={{ backgroundImage: `url(storage/${request.avatar})` }}
                            ></div>
                        </Link>
                        <div>
                            <Link href={`/users/${request.id}`} className="text-xs font-semibold dark:text-white">
                                {request.name}
                            </Link>
                            <div className="text-xs text-gray-500 dark:text-gray-200">@{request.username}</div>
                        </div>
                    </div>
                    <div className="ml-auto">
                        <button
                            className="text-xs text-blue-600 hover:text-blue-800 dark:text-white"
                            onClick={() => handleAcceptRequest(request.id)}
                        >
                            Accept
                        </button>
                        <button
                            className="text-xs text-red-600 hover:text-red-800 ml-2 dark:text-red-500"
                            onClick={() => handleRejectRequest(request.id)}
                        >
                            Reject
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
