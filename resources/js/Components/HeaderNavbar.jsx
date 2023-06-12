import React from 'react';
import { usePage } from '@inertiajs/react';
import { FiSettings, FiBell, FiMessageCircle, FiUser } from 'react-icons/fi';

const HeaderNavbar = () => {
    const { url } = usePage();

    return (
        <div className="flex justify-around h-12 bg-white border-b-2 border-grey ">
            {/* Upper Part */}
            
                <div>
                    <a
                        href="#"
                        className={`w-12 h-12 flex items-center justify-center rounded-full text-purple-700 hover:bg-opacity-80 transition-colors duration-200 ${url === '/settings' ? 'bg-opacity-100' : ''
                            }`}
                    >
                        <FiSettings size={30} className="transform hover:scale-110" />
                    </a>
                </div>
                <div>
                    <a
                        href="#"
                        className={`w-12 h-12 flex items-center justify-center rounded-full text-purple-700 hover:bg-opacity-80 transition-colors duration-200 ${url === '/notifications' ? 'bg-opacity-100' : ''
                            }`}
                    >
                        <FiBell size={30} className="transform hover:scale-110" />
                    </a>
                </div>
                <div>
                    <a
                        href="/chat"
                        className={`w-12 h-12 flex items-center justify-center rounded-full text-purple-700 hover:bg-opacity-80 transition-colors duration-200 ${url === '/chats' ? 'bg-opacity-100' : ''
                            }`}
                    >
                        <FiMessageCircle size={30} className="transform hover:scale-110" />
                    </a>
                </div>
                <div>
                    <a
                        href="/profile"
                        className={`w-12 h-12 flex items-center justify-center rounded-full text-purple-700 hover:bg-opacity-80 transition-colors duration-200 ${url === '/profile' ? 'bg-opacity-100' : ''
                            }`}
                    >
                        <FiUser size={30} className="transform hover:scale-110" />
                    </a>
                </div>
            
        </div>
    );
};

export default HeaderNavbar;
