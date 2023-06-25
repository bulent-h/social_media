import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, formatDistanceToNow } from 'date-fns';
import CommentModal from './CommentModal';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';

const ImageModal = ({ image_path, handleClose }) => {
    return (
        <div onClick={handleClose} className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex items-center justify-center">
            <div className="max-w-4xl max-h-4xl">
                <img src={`/storage/${image_path}`} alt="Post" className="object-contain rounded-lg" />
            </div>
        </div>
    );
};



const Post = ({ user, auth, initialPost }) => {
    //const { user, auth } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState(initialPost);
    const [showImageModal, setShowImageModal] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        fetchComments();
    }, [post.id]);

    useEffect(() => {
        setPost(post);
    }, [post]);

    const handleOpenDropdown = () => {
        setDropdownOpen(true);
    };

    const handleCloseDropdown = () => {
        setDropdownOpen(false);
    };



    const updatePost = (newPostData) => {
        setPost(currentPost => ({ ...currentPost, ...newPostData }));
    };



    const openModal = () => {
        setShowModal(true);
        fetchComments();
    };

    const closeModal = () => {
        setShowModal(false);
        setComments([]);
    };



    const fetchComments = async () => {
        try {
            const response = await axios.get(`/posts/${post.id}/comments`);
            setComments(response.data);
        } catch (error) {
            alert(`Error fetching comments: ${error.response?.data?.message || error.message}`);
        }
    };




    const handleCommentSubmit = async (e, commentContent, setCommentContent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`/comment/${post.id}`, {
                content: commentContent,
                //parent_id: null,  // Omit this line if your comments don't have parent-child relationships
            });

            if (response.status === 201) {

                setCommentContent('');  // Clear the form
                fetchComments();  // Fetch the updated list of comments
            }
        } catch (error) {
            alert(`Failed to submit comment: ${error.response?.data?.message || error.message}`);
        }
    };



    const handleVote = (optionId) => {
        axios.post(`/votes/${post.id}/${optionId}`)
            .then(response => {
                if (response.status === 200) {
                    // Update the state with the returned post data
                    updatePost(response.data.post);
                }
            })
            .catch(error => {
                console.error('Error voting: ', error);
            });
    };



    const handleLike = () => {
        post.liked = !post.liked;
        axios.post(`/posts/${post.id}/like`)
            .then(response => {
                if (response.status === 200) {
                    // Update the state with the returned post data
                    updatePost(response.data.post);
                }
            })
            .catch(error => {
                console.error('Error liking post: ', error);
            });
    };

    const handleDeletePost = () => {
        Inertia.delete(`/posts/${post.id}`)
            .then(response => {
                if (response.status === 200) {
                    // Handle successful deletion (show a message, etc)
                } else {
                    // Handle error during deletion
                }
            })
            .catch(error => console.error('There was a problem with the delete operation: ', error));
    };


    const openImageModal = () => {
        setShowImageModal(true);
    };

    const closeImageModal = () => {
        setShowImageModal(false);
    };

    let date = new Date(post.created_at);

    // Check if the post is older than a day
    let oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    let formattedDate;
    if (date > oneDayAgo) {
        formattedDate = `${formatDistanceToNow(date)} ago`;
        formattedDate = formattedDate.replace(/about /, '');
    } else {
        formattedDate = format(date, 'MMM d');
    }

    return (
        <div key={post.id} className="border-b bg-white dark:bg-gray-800 dark:border-gray-700">
            <div className='flex justify-between space-x-4 p-4 pb-0'>
                <Link href={`/users/${user.id}`}>
                    <div className='flex space-x-4'>
                        <div
                            className="bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400 bg-origin-padding w-12 h-12 rounded-full mb-4"
                            style={{ backgroundImage: `url(/storage/${user.avatar})` }}
                        >
                        </div>
                        <div className="flex flex-col">

                            <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-lg font-semibold dark:text-white">{user.name}</h3>
                                <span className="text-gray-500 dark:text-gray-200">@{user.username}  •</span>
                                <span className="text-gray-400 ">{formattedDate}</span>
                            </div>

                        </div>
                    </div>
                </Link>
                <div className="relative">
                    {user.id === auth.id && (
                        <button type="button" className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-none text-sm font-medium text-gray-600 hover:text-black dark:text-gray-100" id="options-menu" aria-haspopup="true" aria-expanded="true" onClick={dropdownOpen ? handleCloseDropdown : handleOpenDropdown}>
                            •••
                        </button>
                    )}

                    {dropdownOpen && (
                        <div className="origin-top-right absolute right-0 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    role="menuitem"
                                    onClick={handleDeletePost}
                                >
                                    Delete Post
                                </a>
                            </div>
                        </div>
                    )}
                </div>

            </div>
            <div className="text-gray-600 px-16 ml-4 -mt-4 font-bold mb-4 dark:text-gray-100">{post.content}</div>
            <div className='flex justify-center'>
                {post.type === 'image' && post.image_path &&
                    <div
                        onClick={openImageModal}
                        className="object-cover object-center w-10/12 h-96 rounded-xl mb-4 cursor-pointer"
                        style={{ backgroundImage: `url(/storage/${post.image_path})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundColor: 'black' }}
                    >
                    </div>
                }
                {post.type === 'video' && post.video_path &&
                    <video
                        className="object-cover object-center w-10/12 h-96 rounded-xl mb-4"
                        controls
                        src={`/storage/${post.video_path}`}
                    >
                        Your browser does not support the video tag.
                    </video>
                }
            </div>
            <div className=''>
                {post.type === 'poll' && post.polls.length > 0 && post.polls[0].options &&
                    <div className="flex flex-col justify-center items-start w-10/12 mx-auto p-4 rounded-xl ">
                        <div className="text-lg font-semibold mb-4 ml-6 dark:text-white">{post.polls[0].question}</div>
                        {post.polls[0].options.map((option, index) => {
                            // Determine if the current user has voted for this option
                            let userHasVoted = option.votes.some(vote => vote.user.id === auth.id);

                            // Determine if the current user has voted on this poll at all
                            let userHasVotedOnPoll = post.polls[0].options.some(option => option.votes.some(vote => vote.user.id === auth.id));

                            // Check if 24 hours have passed since the creation of the poll
                            let currentTime = new Date().getTime();
                            let pollCreationTime = new Date(post.polls[0].created_at).getTime();
                            let hasPollExpired = (currentTime - pollCreationTime) > (24 * 60 * 60 * 1000);

                            if (userHasVotedOnPoll || hasPollExpired) {
                                // If the user has voted on this poll, or the poll has expired, display the results
                                let voteCount = option.votes.length;
                                let totalCount = post.polls[0].options.reduce((sum, option) => sum + option.votes.length, 0);
                                let percentage = Math.round((voteCount / totalCount) * 100);

                                return (
                                    <div key={index} className={`w-full mb-2 p-2 rounded-full ${userHasVoted ? 'bg-purple-700 text-white' : 'bg-gray-200 text-black'}`}>
                                        {option.text} - {voteCount} votes ({percentage}%)
                                    </div>
                                );
                            } else {
                                // If the user hasn't voted on this poll, display the options to vote
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleVote(option.id)}
                                        className="w-full mb-2 p-2 rounded-full bg-purple-700 text-white"
                                    >
                                        {option.text}
                                    </button>
                                );
                            }
                        })}
                    </div>
                }
            </div>
            <div className='flex mx-5'>
                <div className='text-gray-500 tracking-wider mr-3 dark:text-gray-200'>{post.likes_count} Likes</div>
                <div onClick={() => openModal(post.id)} className='text-gray-500 cursor-pointer hover:underline tracking-wider dark:text-gray-200'> {post.comments_count} Comments</div>
            </div>
            <div className='flex items-center justify-around px-10 border-t border-gray-100 dark:border-gray-700'>
                <div>
                    <button
                        className="flex text-purple-500 hover:text-purple-800 transition duration-150 ease-in-out mr-2 "
                        onClick={() => handleLike(post.id)}
                    >
                        <div>
                            {post.liked ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-thumb-up-filled m-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M13 3a3 3 0 0 1 2.995 2.824l.005 .176v4h2a3 3 0 0 1 2.98 2.65l.015 .174l.005 .176l-.02 .196l-1.006 5.032c-.381 1.626 -1.502 2.796 -2.81 2.78l-.164 -.008h-8a1 1 0 0 1 -.993 -.883l-.007 -.117l.001 -9.536a1 1 0 0 1 .5 -.865a2.998 2.998 0 0 0 1.492 -2.397l.007 -.202v-1a3 3 0 0 1 3 -3z" strokeWidth="0" fill="currentColor"></path>
                                    <path d="M5 10a1 1 0 0 1 .993 .883l.007 .117v9a1 1 0 0 1 -.883 .993l-.117 .007h-1a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-7a2 2 0 0 1 1.85 -1.995l.15 -.005h1z" strokeWidth="0" fill="currentColor"></path>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-thumb-up m-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
                                </svg>
                            )}
                        </div>
                        <div className='m-2 tracking-widest font-bold dark:text-gray-200'>Like</div>
                    </button>
                </div>
                <div>
                    <button
                        className="flex text-purple-500 hover:text-purple-800 transition duration-150 ease-in-out mr-2 "
                        onClick={() => openModal(post.id)}
                    >
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-message-dots m-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4"></path>
                                <path d="M12 11l0 .01"></path>
                                <path d="M8 11l0 .01"></path>
                                <path d="M16 11l0 .01"></path>
                            </svg>
                        </div>
                        <div className='m-2 tracking-widest font-bold dark:text-gray-200'>Comments</div>
                    </button>
                </div>



            </div>
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
                    <CommentModal
                        show={showModal}
                        comments={comments}
                        handleClose={closeModal}
                        handleSubmit={handleCommentSubmit}
                        post={post}
                    />
                </div>
            )}

            {showImageModal && (
                <ImageModal
                    image_path={post.image_path}
                    handleClose={closeImageModal}
                />
            )}

        </div>
    );
};

export default Post;