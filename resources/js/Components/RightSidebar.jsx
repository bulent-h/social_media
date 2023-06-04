import React from 'react';
import { usePage } from '@inertiajs/react';
import { FiSettings, FiBell, FiMessageCircle, FiUser } from 'react-icons/fi';

const RightSidebar = () => {
  const { url } = usePage();

  return (
    <div className="flex items-center justify-center h-12 bg-gradient-to-br from-purple-800 to-cyan-200 rounded-full">
      {/* Upper Part */}
      <div className="flex items-center justify-center">
        <a
          href="#"
          className={`w-12 h-12 flex items-center justify-center rounded-full text-white hover:bg-opacity-80 transition-colors duration-200 ${
            url === '/settings' ? 'bg-opacity-100' : ''
          }`}
        >
          <FiSettings size={24} className="transform hover:scale-110" />
        </a>
        <a
          href="#"
          className={`w-12 h-12 flex items-center justify-center rounded-full text-white hover:bg-opacity-80 transition-colors duration-200 ${
            url === '/notifications' ? 'bg-opacity-100' : ''
          }`}
        >
          <FiBell size={24} className="transform hover:scale-110" />
        </a>
        <a
          href="/chat"
          className={`w-12 h-12 flex items-center justify-center rounded-full text-white hover:bg-opacity-80 transition-colors duration-200 ${
            url === '/chats' ? 'bg-opacity-100' : ''
          }`}
        >
          <FiMessageCircle size={24} className="transform hover:scale-110" />
        </a>
        <a
          href="/profile"
          className={`w-12 h-12 flex items-center justify-center rounded-full text-white hover:bg-opacity-80 transition-colors duration-200 ${
            url === '/profile' ? 'bg-opacity-100' : ''
          }`}
        >
          <FiUser size={24} className="transform hover:scale-110" />
        </a>
      </div>

      {/* Lower Part */}
      <div className="h-64">
        {/* Render dynamic content here based on the current page */}
      </div>
    </div>
  );
};

export default RightSidebar;
