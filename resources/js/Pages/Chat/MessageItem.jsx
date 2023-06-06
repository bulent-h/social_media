import { createContext, useContext, useEffect, useState } from "react";
import { ChatContext } from '@/Pages/Chat/ChatContext';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import DropdownMenu from '@/Components/DropdownMenu';
dayjs.extend(relativeTime);

export default function MessageItem({ message }) {


    const { auth, currentUserChat, fetchMessages, replyMessage, setReplyMessage } = useContext(ChatContext);
    function handelReply() {
        setReplyMessage(message);
    }

    function handleDelete() {
        axios.post(route('message.delete', { message: message }))
            .then(response => {
                if (response.status >= 200 && 299 >= response.status) {
                    fetchMessages(currentUserChat);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {


    }, [message]);

    return (
        <>
            <DropdownMenu>


                {
                    (auth.auth.user.id == message.sender_id) ?
                        <div className="flex justify-end mb-2 ">
                            <DropdownMenu.Content contentClasses='py-2 mr-10' >
                                <DropdownMenu.Link onClick={handleDelete} className="flex justify-center px-12 text-sm text-red-600">
                                    Delete
                                </DropdownMenu.Link>
                                <DropdownMenu.Link onClick={handelReply} className="flex justify-center px-12">
                                    Reply
                                </DropdownMenu.Link>

                            </DropdownMenu.Content>
                            <div className="rounded-xl py-2 px-3 bg-blue-100 dark:bg-gray-900 drop-shadow-xl" style={{ maxWidth: '45%', filter: 'dropShadow(0 7px 3px rgb(0 0 0 / 0.30))' }}>

                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-sm mt-1 text-gray-800 dark:text-gray-200">
                                            {message.text_content}
                                        </p>
                                        {/* reply */}
                                        {(message?.parent_id) &&
                                            <div className="border rounded-xl bg-blue-50 dark:bg-gray-800 drop-shadow-xl border-gray-200 dark:border-gray-700 m-2">
                                                <div className="m-2">
                                                    <div className="flex justify-between">

                                                        <p className="text-sm text-blue-300 truncate w-40">
                                                            {currentUserChat.name}
                                                        </p>
                                                    </div>
                                                    <p className="text-sm mt-1 text-gray-800 dark:text-gray-200">
                                                        {message.text_content}
                                                    </p>
                                                    <p className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        {
                                                            dayjs(message.updated_at).fromNow()
                                                        }
                                                    </p>
                                                </div>

                                            </div>
                                        }
                                        {/* end of reply */}
                                    </div>

                                    <DropdownMenu.Trigger contentClasses=' '>
                                        <div className="ml-3 text-gray-900 dark:text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <path fill="currentColor"
                                                    d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z">
                                                </path>
                                            </svg>
                                        </div>
                                    </DropdownMenu.Trigger>


                                </div>
                                <p className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {
                                        dayjs(message.updated_at).fromNow()
                                    }
                                </p>
                            </div>
                        </div>
                        :
                        <div className="flex mb-2 ">
                            <DropdownMenu.Content contentClasses='py-2 mr-10' align="left" >

                                <DropdownMenu.Link onClick={handelReply} className="flex justify-center px-12">
                                    Reply
                                </DropdownMenu.Link>

                            </DropdownMenu.Content>
                            <div className="rounded-xl py-2 px-3 bg-white dark:bg-gray-900"
                                style={{ maxWidth: '45%', filter: 'drop-shadow(0 7px 3px rgb(0 0 0 / 0.30))' }}>
                                <div className="flex justify-between">

                                    <p className="text-sm text-blue-300 truncate w-40">
                                        {currentUserChat.name}
                                    </p>

                                    <DropdownMenu.Trigger contentClasses=' '>
                                        <div className="ml-3 text-gray-900 dark:text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <path fill="currentColor"
                                                    d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z">
                                                </path>
                                            </svg>
                                        </div>
                                    </DropdownMenu.Trigger>
                                </div>
                                <p className="text-sm mt-1 text-gray-800 dark:text-gray-200">
                                    {message.text_content}
                                </p>
                                <div >
                                    <img alt="" />
                                </div>
                                <p className="text-right text-xs text-gray-500 mt-1 dark:text-gray-400">
                                    {dayjs(message.updated_at).fromNow()}
                                </p>
                            </div>
                        </div>
                }

            </DropdownMenu >

        </>
    );
}
