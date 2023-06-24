import React from 'react';
import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { FiSettings, FiBell, FiMessageCircle, FiUser } from 'react-icons/fi';
import FriendRequests from './FriendRequests';
import { Link } from '@inertiajs/react';

export default function RightSidebar() {
    const { url } = usePage();

    const [friends, setFriends] = useState([]);

    useEffect(() => {
        axios.get(route('user.getFriends'))
            .then(data => {
                setFriends(data.data.friends);
                console.log(data.data.friends);
            })
            .catch(error => console.error('There has been a problem with your fetch operation:', error));
    }, []);

    return (
        <>
            <div className="flex flex-col items-center mt-10">
                <h2 className="text-lg font-semibold mb-2 ">Friends</h2>

                <div>
                    {(friends) &&
                        friends.map((friend) => (
                            <Link key={friend.id} href={route('user.show', { user: friend })}>

                                <div
                                    className='flex items-center   px-3 font-medium text-sm hover:bg-blue-50 dark:hover:bg-gray-800   bg-white dark:bg-gray-900 '>
                                    <div>

                                        <div
                                            id='profile-image'
                                            className=" bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400 bg-origin-padding w-12 h-12 rounded-full"
                                            style={(friend.avatar) && { backgroundImage: `url(/storage/${user.avatar})` }}>
                                        </div>
                                        <div className='flex justify-end '>

                                            {(friend.status == 'online') ?
                                                <svg width="6px" height="6px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><circle fill="#60d421" cx="18" cy="18" r="18"></circle></g></svg>
                                                :
                                                <svg width="6px" height="6px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><circle fill="#AAAAAA" cx="18" cy="18" r="18"></circle></g></svg>
                                            }
                                        </div>
                                    </div>
                                    <div className="ml-4 w-full py-4 text-gray-700 dark:text-gray-300 ">

                                        <div className="grid grid-cols-3 gap-4 place-content-end font-semibold">
                                            <i className="col-span-2 truncate overflow-hidden" id="username">
                                                {friend.name}
                                                <div className='flex'>

                                                    <p className="justify-self-end text-xs text-gray-400 dark:text-gray-500">
                                                        {friend.status}

                                                    </p>
                                                </div>
                                            </i>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))

                    }
                </div>

            </div >

        </>
    );
};
