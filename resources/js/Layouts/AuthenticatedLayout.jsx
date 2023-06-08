import { useState, useEffect } from 'react';
import Sidebar from '@/Components/Sidebar';
import RightSidebar from '@/Components/RightSidebar';

export default function AuthenticatedLayout({ user, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .scrollbar-custom {
        scrollbar-width: thin;
        scrollbar-color: #888888 #f4f4f4;
      }

      .scrollbar-custom::-webkit-scrollbar {
        width: 8px;
      }

      .scrollbar-custom::-webkit-scrollbar-track {
        background-color: #f4f4f4;
      }

      .scrollbar-custom::-webkit-scrollbar-thumb {
        background-color: #888888;
        border-radius: 4px;
      }

      .scrollbar-custom::-webkit-scrollbar-thumb:hover {
        background-color: #555555;
      }
    `;

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-200 justify-center">
      <div className="flex w-3/4">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto scrollbar-custom bg-white">{children}</div>
        </div>
        <div className="flex flex-col w-64 border-l-2 border-gray-200">
          {/* Additional content */}
          {/* Replace the placeholder content below with your desired content */}
          <div className="bg-white py-4 px-6 flex-1">
            <RightSidebar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
