import React from 'react';
import { usePage } from '@inertiajs/react';
import { useState,useEffect } from 'react';
import { FiSettings, FiBell, FiMessageCircle, FiUser } from 'react-icons/fi';
import FriendRequests from './FriendRequests';
import Friends from '@/Components/Friends'
export default function RightSidebar() {
    const { url } = usePage();

    return (
        <>
            <div className="items-center justify-center h-12 bg-gradient-to-br from-purple-800 to-cyan-200 rounded-full mx-4 dark:bg-white">
                {/* Upper Part */}
                <div className="flex items-center justify-center mb-12 ">
                    <a
                        href={route('profile.update')}
                        className={`w-12 h-12 flex items-center justify-center rounded-full text-white hover:bg-opacity-80 transition-colors duration-200 ${url === '/settings' ? 'bg-opacity-100' : ''}`}
                    >
                        <FiSettings size={24} className="transform hover:scale-110" />
                    </a>
                    <a
                        href="#"
                        className={`w-12 h-12 flex items-center justify-center rounded-full text-white hover:bg-opacity-80 transition-colors duration-200 ${url === '/notifications' ? 'bg-opacity-100' : ''}`}
                    >
                        <FiBell size={24} className="transform hover:scale-110" />
                    </a>
                    <a
                        href="/chat"
                        className={`w-12 h-12 flex items-center justify-center rounded-full text-white hover:bg-opacity-80 transition-colors duration-200 ${url === '/chats' ? 'bg-opacity-100' : ''}`}
                    >
                        <FiMessageCircle size={24} className="transform hover:scale-110" />
                    </a>
                    <a
                        href={route('user.me')}
                        className={`w-12 h-12 flex items-center justify-center rounded-full text-white hover:bg-opacity-80 transition-colors duration-200 ${url === '/profile' ? 'bg-opacity-100' : ''}`}
                    >
                        <FiUser size={24} className="transform hover:scale-110" />
                    </a>
                </div>




            </div>
            <div className='mt-16'>
            {url != '/my-friends' &&  <Friends/>}
            </div>
            <div className="h-64">
                {url === '/my-friends' && <FriendRequests />}
            </div>



        </>
    );
};

