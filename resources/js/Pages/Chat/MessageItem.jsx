import { createContext, useContext, useEffect, useState } from "react";
import { ChatContext } from '@/Pages/Chat/ChatContext';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function MessageItem({ message }) {

    const { auth, currentUserChat } = useContext(ChatContext);

    useEffect(() => {


    }, [message]);

    return (
        <>
            {
                (auth.auth.user.id == message.sender_user_id) ?
                    <div className="flex justify-end mb-2 ">
                        <div className="rounded-xl py-2 px-3 bg-blue-100 dark:bg-gray-900 drop-shadow-xl" style={{ maxWidth: '45%', filter: 'dropShadow(0 7px 3px rgb(0 0 0 / 0.30))' }}>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm mt-1 text-gray-800 dark:text-gray-200">
                                        {message.text_content}
                                    </p>
                                </div>
                                <div>
                                    <span className="inline-flex rounded-md">
                                        <button type="button"
                                            className="inline-flex items-center  border border-transparent text-sm leading-4 font-medium rounded-md  text-gray-900 dark:text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" >
                                                <path
                                                    d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z">
                                                </path>
                                            </svg>
                                        </button>
                                    </span>
                                </div>
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
                        <div className="rounded-xl py-2 px-3 bg-white dark:bg-gray-900"
                            style={{ maxWidth: '45%', filter: 'drop-shadow(0 7px 3px rgb(0 0 0 / 0.30))' }}>
                            <p className="text-sm text-blue-300 truncate w-40">
                                {currentUserChat.name}
                            </p>
                            <p className="text-sm mt-1 text-gray-800 dark:text-gray-200">
                                {message.text_content}
                            </p>
                            <div >
                                <img alt="" />
                            </div>
                            <p className="text-right text-xs text-gray-500 mt-1 dark:text-gray-400">
                                {message.updated_at}
                            </p>
                        </div>
                    </div>
            }
        </>
    );
}
