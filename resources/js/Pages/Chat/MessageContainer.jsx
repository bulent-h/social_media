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
        <>{(currentUserChat) ?
            <>

                <div className="py-2 px-3 flex flex-row justify-between items-center bg-indigo-500 dark:bg-[#111120]" >
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
                                    <div className="bg-gray-300 dark:bg-gray-700 h-12 w-12 rounded-full"></div>
                            }

                        </div>
                        <div className="ml-4 dark:text-gray-200">
                            <p className="text-gray-darkest font-bold w-36 truncate overflow-hidden">
                                {currentUserChat?.name}
                            </p>
                            <p className="text-gray-darker text-xs mt-1" >
                                {currentUserChat?.status}
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

                < div className="flex-1 overflow-auto bg-gray-200  dark:bg-gray-700" >

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
            :
            <>
                <div className="py-2 px-3 flex flex-row justify-between items-center bg-indigo-500 dark:bg-[#111120]" >
                    <div className="flex items-center">
                        <div>
                            <div className="h-12 w-12 rounded-full">

                            </div>
                        </div>
                    </div>
                </div >

                < div className="flex-1 overflow-auto bg-gray-200  dark:bg-gray-700" >
                    <div className=" flex justify-center items-center w-full h-full">
                            <svg
                                height="300px"
                                width="300px"
                                className=""
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 512.001 512.001"
                                xmlSpace="preserve"
                                fill="#000000"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <path
                                    className="fill-[#a8c6f0] dark:fill-[#295ea8]"
                                        // style={{ fill: "#DBE9FD" }}
                                        d="M461.858,33.517H50.143c-27.612,0-50.074,22.462-50.074,50.074v278.19 c0,27.612,22.462,49.852,50.074,49.852h50.074v83.68c0,6.753,4.064,12.839,10.302,15.42c6.088,2.531,13.33,1.251,18.191-3.619 l95.258-95.48h237.89c27.612,0,50.074-22.24,50.074-49.852V83.591C511.933,55.978,489.472,33.517,461.858,33.517z"
                                    />{" "}
                                    <path
                                    className="fill-[#94b6e6] dark:fill-[#275390]"
                                        // style={{ fill: "#C5DCFD/" }}
                                        d="M461.858,33.517H261.567v378.116h200.291c27.612,0,50.074-22.24,50.074-49.852V83.591 C511.933,55.978,489.472,33.517,461.858,33.517z"
                                    />{" "}
                                    <path
                                        style={{ fill: "#6BBAE2" }}
                                        d="M311.364,300.182H211.216c-9.22,0-16.691-7.471-16.691-16.691v-116.84H144.45 c-6.547,0-12.492-3.83-15.197-9.797c-2.712-5.96-1.679-12.959,2.635-17.887L248.728,5.436c6.335-7.249,18.789-7.249,25.124,0 l116.84,133.531c4.314,4.928,5.347,11.927,2.635,17.887c-2.706,5.966-8.65,9.797-15.197,9.797h-50.074v116.84 C328.056,292.711,320.585,300.182,311.364,300.182z"
                                    />{" "}
                                    <path
                                        style={{ fill: "#60AED5" }}
                                        d="M273.852,5.436c-3.106-3.552-7.681-5.338-12.285-5.409v300.155h49.797 c9.22,0,16.691-7.471,16.691-16.691v-116.84h50.074c6.547,0,12.492-3.83,15.197-9.797c2.712-5.96,1.679-12.959-2.635-17.887 L273.852,5.436z"
                                    />{" "}
                                </g>
                            </svg>
                    </div>
                </div>
                <div className="relative">

                    <div className="bg-grey-100 px-4 py-4 flex items-center bg-indigo-500 dark:bg-[#111120]">

                        <div className="text-gray-900 dark:text-gray-400 ">
                            <div className="h-10 w-10 rounded-full">

                            </div>
                        </div>


                    </div>
                </div>
            </>
        }
        </>
    );
}
