import React, { useState } from 'react';
import axios from 'axios';
import Comment from './Comment';

const CommentModal = ({ show, comments, handleClose, handleSubmit, post }) => {
    const [commentContent, setCommentContent] = useState('');


    if (!show) {
        return null;
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-content bg-white w-3/4 md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg relative">
                <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-xl mb-4 text-purple-700">Comments</h2>

                <div className="overflow-y-scroll" style={{ maxHeight: '600px' }}> {/* Adjust the maxHeight as needed */}
                    {comments.map(comment => (
                        <Comment key={comment.id} comment={comment} />
                    ))}
                </div>

                <div className="mb-4 relative">
                    <form onSubmit={(e) => handleSubmit(e, commentContent, setCommentContent)}>
                        <input
                            type="text"
                            value={commentContent}
                            onChange={e => setCommentContent(e.target.value)}
                            className="w-full border rounded-full px-6 py-2 bg-gray-100 focus:border-cyan-600 border-purple-600 pr-10 focus:outline-none focus:ring-0" // add padding right to make room for the button
                            placeholder="Add a comment..."
                        />
                        <button
                            type="submit"
                            className={`absolute right-2 top-2 text-lg ${commentContent ? 'text-purple-500' : 'text-gray-400'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-message-forward" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4"></path>
                                <path d="M13 9l2 2l-2 2"></path>
                                <path d="M15 11h-6"></path>
                            </svg>
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default CommentModal;
