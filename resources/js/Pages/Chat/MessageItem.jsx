import { createContext, useContext, useEffect, useState } from "react";
import { ChatContext } from '@/Pages/Chat/ChatContext';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import DropdownMenu from '@/Components/DropdownMenu';
import Modal from '@/Components/ImageModal';

dayjs.extend(relativeTime);

export default function MessageItem({ message }) {
    const [imageModal, setImageModal] = useState(false);
    const handleModalClick = () => {
        setImageModal(true);
    };


    const closeModal = () => {
        setImageModal(false);
        // reset();
    };
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

                            <DropdownMenu.Content contentClasses='py-1 mr-4' >
                                <DropdownMenu.Link onClick={handleDelete} className="flex justify-center px-12 text-sm text-red-600">
                                    Delete
                                </DropdownMenu.Link>
                                <DropdownMenu.Link onClick={handelReply} className="flex justify-center px-12">
                                    Reply
                                </DropdownMenu.Link>

                            </DropdownMenu.Content>

                            <div className="rounded-xl py-2 px-3 bg-blue-100 dark:bg-gray-900 drop-shadow-xl relative"
                                style={{ maxWidth: '45%', filter: 'dropShadow(0 7px 3px rgb(0 0 0 / 0.30))' }}
                            >

                                <div className="absolute right-0 top-2">
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
                                <div className="flex justify-between ">

                                    <div
                                        style={{ width: '97%', filter: 'dropShadow(0 7px 3px rgb(0 0 0 / 0.30))' }}>
                                        {/* reply */}
                                        {(message?.parent) &&
                                            <div
                                                style={{ maxWidth: '100%', filter: 'dropShadow(0 7px 3px rgb(0 0 0 / 0.30))' }}

                                                className=" border-none p-1 rounded-xl bg-gray-50 dark:bg-gray-800 drop-shadow-xl border-gray-200 dark:border-gray-700 m-2">
                                                <div className="m-2">
                                                    <div className="flex justify-between">
                                                        {
                                                            (auth.auth.user.id == message.parent.sender_id) ?
                                                                <p className="text-sm text-blue-300 truncate w-40">
                                                                    {auth.auth.user.name}
                                                                </p>
                                                                :
                                                                <p className="text-sm text-blue-300 truncate w-40">
                                                                    {currentUserChat.name}
                                                                </p>

                                                        }

                                                    </div>
                                                    <p className="text-sm mt-3 break-words text-gray-800 dark:text-gray-200">
                                                        {message.parent.text_content}
                                                    </p>
                                                    <p className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        {
                                                            dayjs(message.parent.updated_at).format('MMM DD, YYYY HH:mm')
                                                        }
                                                    </p>
                                                </div>

                                            </div>
                                        }
                                        {/* end of reply */}
                                        <div>
                                            <p className="text-sm mt-3 break-words text-gray-800 dark:text-gray-200">
                                                {message.text_content}
                                            </p>
                                        </div>
                                        <div>
                                            {(message.media_content_path) &&

                                                <div onClick={handleModalClick} className="bg-gray-400/50 m-2  bottom-20 right-2 w-fit rounded-xl ">
                                                    <>{
                                                        (message.media_type == 'image') &&
                                                        <div
                                                            className=" w-36 h-36 opacity-75 rounded-md bg-contain bg-cover"
                                                            style={{ backgroundImage: `url(storage/${message.media_content_path})` }}
                                                        >
                                                        </div>
                                                    }</>
                                                    <>{
                                                        (message.media_type == 'video') &&
                                                        < video
                                                            className=" w-36 h-36"
                                                            src={'/storage/' + message.media_content_path}>
                                                        </video >
                                                    }</>

                                                </div>
                                            }
                                        </div>

                                    </div>




                                </div>
                                <p className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {
                                        dayjs(message.updated_at).format('MMM DD, YYYY HH:mm')
                                    }
                                </p>
                            </div>
                        </div>
                        :
                        <div className="flex mb-2 ">


                            <div className="rounded-xl py-2 px-3 bg-gray-100 dark:bg-gray-900 drop-shadow-xl relative"
                                style={{ maxWidth: '45%', filter: 'dropShadow(0 7px 3px rgb(0 0 0 / 0.30))' }}
                            >
                                <div className="absolute right-0 top-2">
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
                                <DropdownMenu.Content contentClasses='py-1 mr-4' >
                                    <DropdownMenu.Link onClick={handleDelete} className="flex justify-center px-12 text-sm text-red-600">
                                        Delete
                                    </DropdownMenu.Link>
                                    <DropdownMenu.Link onClick={handelReply} className="flex justify-center px-12">
                                        Reply
                                    </DropdownMenu.Link>

                                </DropdownMenu.Content>

                                <div className="flex justify-between ">

                                    <div
                                        style={{ width: '97%', filter: 'dropShadow(0 7px 3px rgb(0 0 0 / 0.30))' }}>
                                        <div className="flex justify-between">

                                            <p className="text-sm text-blue-300 truncate w-40">
                                                {currentUserChat.name}
                                            </p>

                                        </div>
                                        {/* reply */}
                                        {(message?.parent) &&
                                            <div
                                                style={{ maxWidth: '100%', filter: 'dropShadow(0 7px 3px rgb(0 0 0 / 0.30))' }}

                                                className=" border-none p-1 rounded-xl bg-gray-50 dark:bg-gray-800 drop-shadow-xl border-gray-200 dark:border-gray-700 m-2">
                                                <div className="m-2">
                                                    <div className="flex justify-between">
                                                        {
                                                            (auth.auth.user.id == message.parent.sender_id) ?
                                                                <p className="text-sm text-blue-300 truncate w-40">
                                                                    {auth.auth.user.name}
                                                                </p>
                                                                :
                                                                <p className="text-sm text-blue-300 truncate w-40">
                                                                    {currentUserChat.name}
                                                                </p>

                                                        }

                                                    </div>
                                                    <p className="text-sm mt-3 break-words text-gray-800 dark:text-gray-200">
                                                        {message.parent.text_content}
                                                    </p>
                                                    <p className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        {
                                                            dayjs(message.parent.updated_at).format('MMM DD, YYYY HH:mm')
                                                        }
                                                    </p>
                                                </div>

                                            </div>
                                        }
                                        {/* end of reply */}
                                        <div>
                                            <p className="text-sm mt-3 break-words text-gray-800 dark:text-gray-200">
                                                {message.text_content}
                                            </p>
                                        </div>
                                        <div>
                                            {(message.media_content_path) &&

                                                <div onClick={handleModalClick} className="bg-gray-400/50 m-2  bottom-20 right-2 w-fit rounded-xl ">
                                                    <>{
                                                        (message.media_type == 'image') &&
                                                        <div
                                                            className=" w-36 h-36 opacity-75 rounded-md bg-contain bg-cover"
                                                            style={{ backgroundImage: `url(storage/${message.media_content_path})` }}
                                                        >
                                                        </div>
                                                    }</>
                                                    <>{
                                                        (message.media_type == 'video') &&
                                                        < video
                                                            className=" w-36 h-36"
                                                            src={'/storage/' + message.media_content_path}>
                                                        </video >
                                                    }</>

                                                </div>
                                            }
                                        </div>

                                    </div>




                                </div>
                                <p className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {
                                        dayjs(message.updated_at).format('MMM DD, YYYY HH:mm')
                                    }
                                </p>
                            </div>
                        </div>
                }

                <Modal show={imageModal} onClose={closeModal}>

                    <>{
                        (message.media_type == 'image') &&
                        <div
                            className=" rounded-lg bg-contain bg-cover"
                            style={{
                                backgroundImage: `url(storage/${message.media_content_path})`,
                                backgroundSize: 'cover',
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                maxHeight: '90vh',
                                height: '80vh',
                                minHeight: '70vh',
                                maxWidth: '70vh',
                                width: '50vh',
                                minWidth: '70vh',

                            }}
                        />
                    }</>
                    <>{
                        (message.media_type == 'video') &&
                        < video controls autoPlay
                            src={'/storage/' + message.media_content_path}
                            style={{
                                width: '100vh',
                            }}>
                        </video >
                    }</>

                </Modal>
            </DropdownMenu >


        </>
    );
}
