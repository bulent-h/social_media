
import ChatList from '@/Pages/Chat/ChatList';
import MessageContainer from '@/Pages/Chat/MessageContainer';
import { useEffect, useState, createContext } from 'react';
import { ChatContext } from '@/Pages/Chat/ChatContext';
import Pusher from 'pusher-js';
import { usePage } from '@inertiajs/react';

export default function Chat(auth) {
    const { props } = usePage();
    const [currentUserChat, setCurrentUserChat] = useState(props.selectedUser);
    const [users, setUsers] = useState();
    const [messages, setMessages] = useState();
    const [replyMessage, setReplyMessage] = useState();


    async function setup() {

        await axios.get(route('chat.getUsers'))
            .then((data) => {
                if (users != data.data) {
                    setUsers(() => data.data);
                    // setCurrentUserChat(() => data.data[0]);
                    if (currentUserChat) {
                        console.log('currentUserChat elected')
                        handleSelectChat(props.selectedUser);
                    }
                    else {
                        // handleSelectChat(data.data[0]);
                    }
                }

            }).catch(err => {
                console.error(err);
            })
    }
    function handleSelectChat(user) {
        fetchMessages(user);
        setCurrentUserChat(() => user);
    }
    async function fetchMessages(user) {
        await axios.get(route('chat.getMessages', {
            id: user.id,
        }))
            .then((data) => {
                setMessages(() => (data.data));
                // console.log(data.data);

            }).catch(err => {
                console.error(err);
            })
    }
    function addToMessageContainer(e) {


        if (e.sender_id == currentUserChat.id) {
            var tmp = [...messages, e];
            setMessages(() => tmp);
            // console.log(e.message);
            // console.log(messages);

            // setMessages([...messages,e])
        }
        if (e.receiver_id == currentUserChat.id) {
            var tmp = [...messages, e];
            setMessages(() => tmp);
        }
    }

    useEffect(() => {

        const channel = Echo.private('chat.' + auth.auth.user.id);
        channel.listen('NewMessage', function (e) {
            addToMessageContainer(e.message);
        });


        if (users == undefined) {
            setup();
        }
        return () => {
            channel.stopListening('NewMessage');
        }

    }, [currentUserChat, messages]);


    return (
        <>
            <ChatContext.Provider value={{ auth, currentUserChat, fetchMessages, addToMessageContainer, replyMessage, setReplyMessage }}>
                <div className="bg-gray-200  dark:bg-gray-800">

                    <div className="w-full h-32 bg-gray-200 dark:bg-gray-800 "></div>
                    <div className="container mx-auto " style={{ 'marginTop': '-128px' }}>

                        <div className="py-2 h-screen flex place-content-center ">
                            <div className="flex border border-gray border-0 rounded shadow-lg h-full overflow-auto " style={{ width: '75em' }}>

                                {/* Left Side of View */}
                                <div className="w-1/3 border flex flex-col overflow-auto border-none bg-gray-100 dark:bg-slate-900" style={{ minWidth: '20em' }}>
                                    <ChatList users={users} handleSelectChat={handleSelectChat} />
                                </div>

                                {/* Right Side of View */}
                                <div className="w-2/3 border flex flex-col border-none" style={{ minWidth: '30em' }}>
                                    {/* Message Container */}
                                    <MessageContainer currentUserChat={currentUserChat} auth={auth} messages={messages} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ChatContext.Provider>
        </>
    );
}
