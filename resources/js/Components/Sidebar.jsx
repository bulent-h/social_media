import { Link, usePage, useRemember } from '@inertiajs/react';
import ApplicationLogoColored from '@/Components/ApplicationLogoColored';
import SearchBar from '@/Components/SearchBar';
import { Inertia } from '@inertiajs/inertia';
import { FaUser, FaSearch } from 'react-icons/fa';

const Sidebar = () => {
  const { url } = usePage();

  const handleLogout = () => {
    Inertia.post('/logout');
  };

  return (
    <div className="relative flex min-h-screen space-y-6 ">
      {/* Sidebar */}
      <div className="overflow-y-auto object-none object-left bg-white text-purple-700 w-64 space-y-6 px-2 inset-y-0 left-0 md:relative md:-translate-x-0 transform -translate-x-full transition duration-100000 ease-in-out border-r-2 border-gray-200">
        <div className="flex mt-6 justify-center">
          <Link href="/">
            <ApplicationLogoColored className="w-20 h-20 fill-current text-gray-500" />
          </Link>
        </div>

        <div className="flex justify-center">
          <SearchBar className='w-52' />
        </div>

        <div>
          <div>
            <Link
              href="/home"
              className={`group flex item-center py-3 px-4 space-x-2 py-4 hover:bg-purple-700 rounded hover:text-white transition duration-200 font-bold ${url === '/home' ? 'bg-purple-700 text-white' : ''
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <span className="group-hover:text-white">Home</span>
            </Link>
          </div>

          <div>
            <Link
              href="/"
              className={`group flex item-center py-3 px-4 space-x-2 py-4 hover:bg-purple-700 rounded hover:text-white transition duration-200 font-bold ${url === '/create' ? 'bg-purple-700 text-white' : ''
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              <span className="group-hover:text-white">Create Post</span>
            </Link>
          </div>

          <div>
            <Link
              href="/chat"
              className={`group flex item-center py-3 px-4 space-x-2 py-4 hover:bg-purple-700 rounded hover:text-white transition duration-200 font-bold ${url === '/chat' ? 'bg-purple-700 text-white' : ''
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-messages"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
              </svg>
              <span className="group-hover:text-white">Messages</span>
            </Link>
          </div>

          <div>
            <Link
              href="/find-friends"
              className={`group flex items-center py-3 px-4 space-x-2 py-4 hover:bg-purple-700 rounded hover:text-white transition duration-200 font-bold ${url === '/find-friends' ? 'bg-purple-700 text-white' : ''
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-search"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
              </svg>
              <span className="group-hover:text-white">Find Friends</span>
            </Link>
          </div>


          <div>
            <Link
              href="/"
              className={`group flex item-center py-3 px-4 space-x-2 py-4 hover:bg-purple-700 rounded hover:text-white transition duration-200 font-bold ${url === '/help' ? 'bg-purple-700 text-white' : ''
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
              <span className="group-hover:text-white">Help Center</span>
            </Link>
          </div>

          <div>
            <button
              className="group flex items-center py-3 px-4 space-x-2 py-4 hover:bg-purple-700 rounded hover:text-white transition duration-200 font-bold"
              onClick={handleLogout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-logout"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 8v-2a2 2 0 0 1 2 -2h2" />
                <path d="M7 15a2 2 0 0 1 -2 -2v-2" />
                <path d="M21 15h-14a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2h14" />
                <path d="M7 20h1" />
                <path d="M12 20h1" />
                <path d="M17 20h1" />
                <path d="M9 16l2 2l-2 2" />
              </svg>
              <span className="group-hover:text-white">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
