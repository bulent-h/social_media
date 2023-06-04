import MessageItem from "@/Pages/Chat/MessageItem";
import MessageInput from '@/Pages/Chat/MessageInput';
import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { ChatContext } from '@/Pages/Chat/ChatContext';
import TextInput from "@/Components/TextInput";
export default function MessageContainer({ messages }) {


    const { auth, currentUserChat, fetchMessages } = useContext(ChatContext);

    const [messageItems, setMessageItems] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [matchMessages, setMatchMessages] = useState([]);
    const [open, setOpen] = useState(false);
    const openRef = useRef(open);

    const closeOnEscape = (e) => {
        if (openRef.current && e.key === 'Escape') {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', closeOnEscape);
        return () => {
            document.removeEventListener('keydown', closeOnEscape);
        };
    }, []);

    function mapAll(data) {
        return (
            data.map(message => <MessageItem message={message} key={message.id} />)
        )
    }
    function mapOne(message) {
        return <MessageItem message={message} key={message.id} currentUserChat={currentUserChat} />
    }


    useEffect(() => {

        if (currentUserChat) {
            console.log(currentUserChat);
            // fetchMessages();


        }
        if (messages) {
            setMessageItems(mapAll(messages))

        }

    }, [currentUserChat, messages]);

    function a() {
        console.log(messageItems)
    }
    return (
        // <!--chat Header -->
        <>
            <div className="py-2 px-3 flex  flex-row justify-between items-center bg-indigo-500 dark:bg-gray-900" >
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
                        <p onClick={a} className="text-gray-darker text-xs mt-1" >
                            Online
                        </p>
                    </div>
                </div>
                <div className="flex">
                    {/* <!-- Dropdown --> */}
                    <div className="ml-6  ">
                        <div className="relative">
                            <div>
                                <div className="ml-6">
                                    <div className="relative">
                                        <div onClick={toggleOpen}>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                        <path
                                                            fill="#263238"
                                                            fillOpacity=".5"
                                                            d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"
                                                        ></path>
                                                    </svg>
                                                </button>
                                            </span>
                                        </div>
                                        {/* Full Screen Dropdown Overlay */}
                                        {open && (
                                            <div className="fixed inset-0 z-40 bg-black opacity-50" onClick={toggleOpen}></div>
                                        )}

                                        <div
                                            className={`absolute z-50 mt-2 rounded-md shadow-lg origin-top-right right-0 ${open ? 'transform opacity-100 scale-100' : 'transform opacity-0 scale-95'
                                                }`}
                                            style={{ display: open ? 'block' : 'none' }}
                                            // onClick={toggleOpen}
                                        >
                                            <div className="rounded-md ring-1 ring-white ring-opacity-5 py-1 bg-white w-96">
                                                <div className="py-4 px-6 bg-white">
                                                    <div className="flex flex-row items-center w-full px-4 rounded-full bg-gray-100 border-none">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                            <path
                                                                fill="#263238"
                                                                fillOpacity=".5"
                                                                d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"
                                                            ></path>
                                                        </svg>
                                                        <input
                                                            type="text"
                                                            value={searchText}
                                                            onChange={(e) => setSearchText(e.target.value)}
                                                            onKeyUp={(e) => e.key === 'Enter' && search()}
                                                            className="w-fit border-gray-100 focus:border-gray-100 focus:ring-gray-100 bg-gray-100 text-sm"
                                                            placeholder="Search"
                                                        />
                                                    </div>
                                                </div>

                                                {/* <div className="bg-gray-100 flex-1">
                                                    {matchMessages.map((matchMessage, index) => (
                                                        <SearchMessageItem
                                                            key={index}
                                                            matchMessage={matchMessage}
                                                            me={me}
                                                            currentReceiver={currentReceiver}
                                                        />
                                                    ))}
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!--End of Dropdown --> */}
                    <div className="ml-6 text-gray-900 dark:text-gray-400 ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="currentColor"
                                d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z">
                            </path>
                        </svg>
                    </div>
                </div>
            </div>
            {/* <!-- Messages --> */}
            <div className="flex-1 overflow-auto bg-gray-200  dark:bg-[#020617]">
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
            </div>
            <MessageInput currentUserChat={currentUserChat} fetchMessages={fetchMessages} />
        </>
    );
}
