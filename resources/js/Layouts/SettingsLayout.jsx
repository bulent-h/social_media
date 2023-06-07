import { useEffect, useState, createContext } from 'react';
import DarkModeButton from "@/Components/DarkModeButton";
import { Link } from "@inertiajs/react";
import Nav from '@/Components/Nav';

export default function Chat({ auth, children }) {

    function NavLink({ active = false, children }) {
        return (
            <>
                <a>
                    <div className={'px-3 hover:bg-blue-50 ' +
                        (active
                            && 'bg-blue-100'
                        )
                    }
                    >
                        <div className='ml-4 w-full text-xl  py-4 text-gray-700 dark:text-gray-300'>
                            {children}
                        </div>
                    </div>
                </a>
            </>
        );
    }

    return (
        <>
            <div className="bg-gray-200  dark:bg-gray-800">
                <div className="w-full h-32 bg-gray-200 dark:bg-gray-800 "></div>
                <div className="container mx-auto " style={{ 'marginTop': '-128px' }}>
                    <div className="py-2 h-screen flex place-content-center ">
                        <div className="bg-white dark:bg-gray-900 flex border border-gray border-0 rounded shadow-lg h-full overflow-auto " style={{ width: '75em' }}>
                            {/* Left Side of View */}
                            <div className="w-1/12 border flex flex-col  border-none" style={{ minWidth: '15em' }}>


                                <div className="py-2 px-3 " >
                                    <div className=" flex items-center  w-36 h-16 ">
                                        <div className="ml-4 dark:text-gray-200 text-3xl text-gray-darkest">
                                            Settings
                                        </div>
                                        <div className='ml-4'>
                                            <DarkModeButton />
                                        </div>
                                    </div>
                                </div >

                                {/* list */}
                                <div className="overflow-y-auto mt-24 overflow-x-hidden" >
                                    <div className=' '>

                                        <Nav active={route().current('profile.edit')}>
                                            Edit Profile
                                        </Nav>
                                        <Nav active={route().current('security.edit')}>
                                            Security
                                        </Nav>
                                        <Nav active={route().current('privacy.edit')}>
                                            Privacy
                                        </Nav>
                                        <Nav active={route().current('notification.edit')}>
                                            Notifications
                                        </Nav>
                                        <Nav active={route().current('block.edit')}>
                                            Block List
                                        </Nav>

                                    </div>
                                </div >

                            </div>

                            {/* Right Side of View */}
                            <div className="w-11/12  flex flex-col border-none" style={{ minWidth: '30em' }}>


                                <div className="py-2 px-3 " >
                                    <div className=" flex items-center justify-end  w-full h-16 ">
                                        <div className="mr-4 dark:text-gray-200 text-3xl text-gray-darkest">
                                            <Link href={route('home')}>
                                                <div className='font-bold' >
                                                    &#10005;
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div >
                                {/* <div className="py-2 px-3 flex flex-row justify-between items-center bg-indigo-500 dark:bg-gray-900" >


                                </div > */}
                                {/* <!-- Messages --> */}

                                < div className="flex-1 overflow-auto" >

                                    <div>
                                        <div className="messageitem" >
                                            {children}

                                        </div>
                                    </div>


                                </div >

                                {/* <MessageInput currentUserChat={currentUserChat} fetchMessages={fetchMessages} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}
