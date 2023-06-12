import MessageItem from "@/Pages/Chat/MessageItem";
import MessageInput from '@/Pages/Chat/MessageInput';
import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { ChatContext } from '@/Pages/Chat/ChatContext';
import DropdownMenu from '@/Components/DropdownMenu';
import SearchDropdown from '@/Components/SearchDropdown';
import TextInput from "@/Components/TextInput";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from '@inertiajs/react';

dayjs.extend(relativeTime);
export default function MessageContainer({ messages }) {


    const { auth, currentUserChat, fetchMessages } = useContext(ChatContext);

    const [messageItems, setMessageItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMessages, setFilteredMessages] = useState();
    const [filteredItems, setFilteredItems] = useState();


    function mapAll(data) {
        return (
            data.map(message => <MessageItem message={message} key={message.id} />)
        )
    }
    // function mapOne(message) {
    //     return <MessageItem message={message} key={message.id} currentUserChat={currentUserChat} />
    // }
    function handleSearch(e) {
        setSearchTerm(e.target.value);

        if (!e.target.value) {
            console.log('e.target.value');
            setFilteredItems();
        }
        else {

            const filtered = messages.filter((message) => {
                const messageText = message.text_content.toLowerCase();
                const term = e.target.value.toLowerCase();
                return messageText.includes(term);
            });

            setFilteredItems(filtered.map(message =>
                <div key={message.id} className=" flex justify-center p-4 dark:bg-gray-900 ">
                    <div className=" w-96">
                        <div className="rounded-xl py-2 px-3 bg-gray-100 dark:bg-gray-900"
                        >
                            {
                                (auth.auth.user.id == message.sender_id) ?
                                    <p className="text-sm text-blue-300 truncate w-40">
                                        {auth.auth.user.name}
                                    </p>
                                    :
                                    <p className="text-sm text-blue-300 truncate w-40">
                                        {currentUserChat.name}
                                    </p>
                            }
                            <p className="text-sm mt-1 text-gray-800 dark:text-gray-200">
                                {message.text_content}
                            </p>
                            <div >
                                <img alt="" />
                            </div>
                            <p className="text-right text-xs text-gray-500 mt-1 dark:text-gray-400">
                                {dayjs(message.updated_at).format('MMM DD, YYYY HH:mm')}
                            </p>
                        </div>
                    </div>
                </div>
            )
            )
        }
        console.log(e.target.value);



    }
    async function handleBlockUser() {
        await axios.post(route('user.block', { user: currentUserChat }))
            .then((data) => {

            }).catch(err => {
                console.error(err);
            })

    }

    useEffect(() => {

        if (currentUserChat) {
            // fetchMessages();
        }
        if (messages) {
            setMessageItems(mapAll(messages))

        }

    }, [currentUserChat, messages]);
    return (
        // <!--chat Header -->
        <>

            <div className="py-2 px-3 flex flex-row justify-between items-center bg-indigo-500 dark:bg-gray-900" >
                <div className="flex items-center">
                    <div>
                        {/* <img className="h-12 w-12 rounded-full" />
                        <img className="h-12 w-12 rounded-full" /> */}

                        {/* <div className="bg-gray-200 dark:bg-gray-700 h-12 w-12 rounded-full"></div> */}
                        {
                            currentUserChat?.avatar ?
                                <div
                                    className=" bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400 bg-origin-padding w-12 h-12 rounded-full"
                                    style={{ backgroundImage: 'url(' + 'storage/' + currentUserChat?.avatar + ')' }}>
                                </div>
                                :
                                <div className="bg-gray-200 dark:bg-gray-700 h-12 w-12 rounded-full"></div>
                        }

                    </div>
                    <div className="ml-4 dark:text-gray-200">
                        <p className="text-gray-darkest w-36 truncate overflow-hidden">
                            {currentUserChat?.name}
                        </p>
                        <p className="text-gray-darker text-xs mt-1" >
                            Online
                        </p>
                    </div>
                </div>
                <div className="flex">
                    {/* <!-- Dropdown --> */}
                    <div className="relative ">

                        <SearchDropdown>
                            <SearchDropdown.Trigger>
                                <div className="ml-3 text-gray-900 dark:text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="currentColor"
                                            d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z">
                                        </path>
                                    </svg>
                                </div>
                            </SearchDropdown.Trigger>
                            <SearchDropdown.Content contentClasses=' '>
                                <div className="py-4 px-6 bg-white  dark:bg-gray-900 ">

                                    <div className="flex flex-row px-4 py-1 items-center w-96 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-900 dark:text-gray-400 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                            <path
                                                d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z">
                                            </path>
                                        </svg>
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={handleSearch}
                                            // onKeyDown={e => handleSearch(e)}
                                            className="w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-300 focus:border-gray-100 focus:ring-gray-100 text-sm focus:ring-0 border-0"
                                            placeholder="Search" />
                                    </div>
                                </div>
                                <div className="h-96  overflow-auto">
                                    <div className="">
                                        {filteredItems}
                                    </div>
                                </div>
                            </SearchDropdown.Content>
                        </SearchDropdown>

                    </div>
                    {/* <!--End of Dropdown --> */}
                    <div className="ml-3 relative">

                        <DropdownMenu>
                            <DropdownMenu.Trigger>
                                <div className="ml-3 text-gray-900 dark:text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="currentColor"
                                            d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z">
                                        </path>
                                    </svg>
                                </div>
                            </DropdownMenu.Trigger>
                            {(currentUserChat) &&
                                <DropdownMenu.Content contentClasses='py-2'>
                                    <a href={route('user.show', { user: currentUserChat })}  >
                                        <DropdownMenu.Link className="flex justify-center px-12">
                                            View Profile
                                        </DropdownMenu.Link>
                                    </a>
                                    <DropdownMenu.Link className="flex justify-center px-12">
                                        Mute Notifications
                                    </DropdownMenu.Link>
                                    <DropdownMenu.Link onClick={handleBlockUser}
                                        className="flex justify-center px-12">
                                        Block User
                                    </DropdownMenu.Link>

                                    <DropdownMenu.Link className="flex justify-center px-12">
                                        Delete Chat
                                    </DropdownMenu.Link>
                                </DropdownMenu.Content>
                            }

                        </DropdownMenu>
                    </div>

                </div>
            </div >
            {/* <!-- Messages --> */}

            < div className="flex-1 overflow-auto bg-gray-200  dark:bg-[#020617]" >

                <div className="py-2 px-3 ">
                    {/* <!-- Message --> */}
                    <div className="messageitem" >
                        {/* <MessageItem /> */}
                        {messageItems}

                    </div>
                </div>
                {/* <!-- End of message --> */}
                <div id="last" className="h-10">
                </div>

            </div >

            <MessageInput currentUserChat={currentUserChat} fetchMessages={fetchMessages} />
        </>
    );
}
