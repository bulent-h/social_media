import { useEffect, useState, useContext } from "react";
import Modal from '@/Components/Modal';
import { ChatContext } from '@/Pages/Chat/ChatContext';

export default function MessageInput() {

    const { auth, currentUserChat, fetchMessages, addToMessageContainer, replyMessage, setReplyMessage } = useContext(ChatContext);
    const [message, setMessage] = useState({
        text: '',
        file: '',
        fileUrl: '',
        receiver_id: currentUserChat?.id,
        sender_id: auth?.auth.user.id,
        parent_id: ''
    });

    // var validationErrors;

    // const [file, setFile] = useState(
    //     file:
    //     url:
    // );

    useEffect(() => {
        handleReceiverChange();


    }, [currentUserChat])

    useEffect(() => {
        setMessage({
            ...message,
            parent_id: replyMessage?.id
        });
        // console.log(message?.parent_id)

    }, [replyMessage])

    function handleTextChange(e) {
        setMessage({
            ...message,
            text: e.target.value
        });
    }
    function handleReceiverChange() {
        setMessage({
            ...message,
            receiver_id: currentUserChat?.id
        });
    }
    function handleFileChange(e) {
        var tmp = e.target.files[0];
        setMessage({
            ...message,
            file: tmp,
            fileUrl: URL.createObjectURL(tmp)
        });

        // console.log(e.target.files[0]);

        // console.log(URL.createObjectURL(e.target.files[0]));
        // console.log(document.getElementById("file").value);
    }
    function handleRemoveFile() {
        setMessage({
            ...message,
            file: '',
            fileUrl: ''
        });
        document.getElementById("file").value = null;
        // console.log(document.getElementById("file").value);
    }
    function handleRemoveReply() {
        setMessage({
            ...message,
            parent_id: ''
        });
        setReplyMessage('');
    }
    function clearInput() {
        setMessage({
            ...message,
            text: '',
            file: '',
            parent_id: '',
            fileUrl: ''
        })
        setReplyMessage(null);
        document.getElementById("file").value = null;

    }
    function handleEnter(e) {
        if (e.key == 'Enter') {
            send();
        }
    }
    function send() {

        axios.post(route('chat.sendMessage'), message, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then(response => {
                if (response.status >= 200 && 299 >= response.status) {
                    fetchMessages(currentUserChat);
                    // console.log(response.data);
                    // addToMessageContainer(response.data);
                    clearInput();

                }
            })
            .catch(error => {
                // validationErrors = error.response.data.errors;
                console.log(error);

            })
        // console.log('send');
    }


    return (
        <>
            <div className="relative">


                {/* <!--Image Preview --> */}
                {
                    message.fileUrl
                    &&
                    <div className="" >
                        <div className="bg-gray-400/50 p-2 absolute bottom-20 right-2 w-1/6 rounded-xl flex flex-col justify-center">
                            <button id="removeBtn" onClick={handleRemoveFile} className=" text-red-500 dark:text-red-500 text-sm hover:bg-gray-400 rounded-xl p-1 mb-1" >Remove</button>
                            <img id="preview" className="w-36 opacity-75 rounded-md" src={message.fileUrl} />
                        </div>
                    </div>
                    /* <div className="text-gray-400 dark:text-gray-500">{'this.validationErrors.file[0] '}</div> */

                }
                {
                    message.parent_id
                    &&
                    <div className="opacity-50 bg-gray-400/50 absolute bottom-20 w-full flex rounded-lg">
                        <button id="removeBtn" onClick={handleRemoveReply}
                            className="text-red-900 dark:text-red-500 text-sm  rounded-xl p-1 mb-1" >
                            <div className='font-bold' >
                                &#10005;
                            </div>
                        </button>
                        <div className="w-4/6 border-none m-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 drop-shadow-xl border-gray-200 dark:border-gray-700 m-2">
                            {
                                (auth.auth.user.id == replyMessage.id) ?
                                    <p className="text-sm text-blue-300 mt-1   truncate w-40">
                                        {auth.auth.user.name}
                                    </p>
                                    :
                                    <p className="text-sm text-blue-300 mt-1   truncate w-40">
                                        {currentUserChat.name}
                                    </p>

                            }
                            <p className="text-sm mt-1  text-gray-800 dark:text-gray-200">
                                {replyMessage.text_content}
                            </p>
                        </div>
                    </div>
                }
                {/* <!-- End Image preveiw--> */}

                {/* <!-- Input --> */}
                <div className="bg-grey-100 px-4 py-4 flex items-center bg-indigo-500 dark:bg-[#111120]">

                    {/* <!-- Emoji input--> */}
                    <div className="text-gray-900 dark:text-gray-400 ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" >
                            <path fill="currentColor"
                                d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z">
                            </path>

                        </svg>
                    </div>

                    {/* <!-- File upload--> */}
                    <div className="ml-6 text-gray-900 dark:text-gray-400 ">
                        <label htmlFor="file" >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="currentColor"
                                    d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z">
                                </path>
                            </svg>
                            <input type="file" id="file" className="sr-only"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>


                    {/* <!-- Text input--> */}
                    <div className="flex-1 mx-4 px-2 ">
                        <input
                            value={message.text}
                            onChange={handleTextChange}
                            onKeyDown={handleEnter}
                            className="w-full border rounded-full px-6 py-2  bg-white dark:bg-gray-700  dark:text-gray-200 focus:border-gray-100 border-indigo-400 dark:border-gray-900 "
                            type="text" placeholder="Message..." />
                    </div>

                    {/* <!-- Send button --> */}
                    <div className=" px-2" >
                        <button type="submit" onClick={send} className="place-self-end text-gray-900 dark:text-gray-400 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" role="img"
                                aria-labelledby="sendIconTitle" strokeWidth="1" strokeLinecap="square"
                                strokeLinejoin="miter" fill="currentColor" >
                                <title id="sendIconTitle">Send</title>
                                <polygon points="21.368 12.001 3 21.609 3 14 11 12 3 9.794 3 2.394" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
