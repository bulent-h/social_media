import { Link } from "@inertiajs/react";
import ChatItem from "@/Pages/Chat/ChatItem";
import { createContext, useContext, useEffect, useState } from 'react'
import DarkModeButton from "@/Components/DarkModeButton";
import { ChatContext } from '@/Pages/Chat/ChatContext';

export default function ChatList({ users, handleSelectChat }) {
    let listItems;
    const [searchText, setSearchText] = useState();
    const { auth, currentUserChat, fetchMessages } = useContext(ChatContext);

    if (users) {
        listItems = users.map(user =>
            <ChatItem user={user} key={user.id} handleSelectChat={() => handleSelectChat(user)} />
        );
    }
    function handleSearchChange(e) {
        setSearchText(() => e.target.value.toUpperCase());
        let txt = (e.target.value).toUpperCase();
        console.log(txt)

        let contacts = document.getElementById('contacts');
        let item = contacts.querySelectorAll('#item');
        for (let i = 0; i < item.length; ++i) {
            let a = item[i].getElementsByTagName("i")[0];
            if (a.innerHTML.toUpperCase().indexOf(txt) > -1) {
                item[i].style.display = '';
            }
            else {
                item[i].style.display = 'none';
            }
        }

    }

    return (
        <>
            {/* <!-- Header --> */}
            <div className="py-2 px-3 border-none border-r-indigo-500 bg-indigo-500 dark:bg-gray-900 flex flex-row justify-between items-center ">
                <Link href={route('profile.edit')}>
                    <div className="flex flex-row" >
                        {/* <img className="bg-gray-200 dark:bg-gray-700 h-12 w-12 rounded-full " /> */}
                        {/* <img className="h-12 w-12 rounded-full" /> */}
                        {/* <div className="bg-gray-200 dark:bg-gray-700 h-12 w-12 rounded-full"></div> */}
                        {/* <div
                            className=" bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400 bg-origin-padding w-12 h-12 rounded-full"
                            style={{ backgroundImage: 'url(' + 'storage/' + auth.auth.user.avatar + ')' }}>
                        </div> */}
                        {
                            auth.auth.user?.avatar?
                                <div
                                    className=" bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400 bg-origin-padding w-12 h-12 rounded-full"
                                    style={{ backgroundImage: 'url(' + 'storage/' + auth.auth.user?.avatar + ')' }}>
                                </div>
                                :
                                <div className="bg-gray-200 dark:bg-gray-700 h-12 w-12 rounded-full"></div>
                        }
                    </div>

                </Link>

                <div className="flex flex-row items-center">
                    {/* <Link href={route('home')}> */}
                    <div className="px-2">
                        <DarkModeButton />
                    </div>


                    <div className="text-gray-900 dark:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                            <path
                                d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z">
                            </path>
                        </svg>
                    </div>
                    {/* </Link> */}


                    {/* <Link href={route('home')}> */}
                    <div className="ml-4 text-gray-900 dark:text-gray-400 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" x="0px" y="0px" width="24" height="24"
                            viewBox="0 0 24 24">
                            <path
                                d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z">
                            </path>
                        </svg>
                    </div>
                    {/* </Link> */}

                </div>
            </div >

            {/* < !--Search --> */}

            <div className="border dark:border-gray-700 border-0">
                <div className="py-4 px-6 bg-white  dark:bg-gray-900 ">

                    <div className="flex flex-row px-4 items-center w-full bg-gray-100 dark:bg-gray-700 rounded-full text-gray-900 dark:text-gray-400 ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path
                                d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z">
                            </path>
                        </svg>
                        <input
                            onChange={handleSearchChange}
                            type="text"
                            className="w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-300 focus:border-gray-100 focus:ring-gray-100 text-sm focus:ring-0 border-0"
                            placeholder="Search" />
                    </div>
                </div>
            </div>

            {/* Contacts */}
            <div className="bg-gray-200 dark:bg-gray-800 overflow-auto" id="contacts">
                <div >
                    {/* <ChatItem /> */}
                    {listItems}
                </div>
            </div >


        </>
    );
}
