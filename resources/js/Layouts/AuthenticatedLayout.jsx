import { useState, useEffect } from 'react';
import Sidebar from '@/Components/Sidebar';
import RightSidebar from '@/Components/RightSidebar';
import HeaderNavbar from '@/Components/HeaderNavbar';

export default function AuthenticatedLayout({ children }) {

  return (

    <div style={{
      backgroundSize: 'cover',
      backgroundImage: "url('MainBackground.png')",
    }} className="flex h-screen bg-gray-200  justify-center md:px-0 shadow-lg dark:bg-gray-800">
      <div className="flex 2xl:w-2/3 w-full ">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className='lg:hidden'><HeaderNavbar className='' /></div>
          <div className="flex-1 overflow-y-auto scrollbar-custom bg-white dark:bg-gray-900">{children}</div>
        </div>
        <div className="block hidden w-0 lg:w-64 lg:border-l-2 border-gray-200 dark:border-gray-700 lg:flex flex-col ">
          {/* Additional content */}
          {/* Replace the placeholder content below with your desired content */}
          <div className="bg-white py-4 flex-1 dark:bg-gray-900 overflow-y-auto">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
