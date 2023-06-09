import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const Comment = ({ comment }) => {
    let date = new Date(comment.created_at);
    let formattedDate = formatDistanceToNow(date);
    formattedDate = formattedDate.replace(/about /, '') + ' ago';



    return (
        <div className="mb-4 p-2 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div className="flex items-center">
                <div
                    className="bg-center bg-cover bg-no-repeat bg-gray-200 rounded-full h-12 w-12 mr-4"
                    style={{ backgroundImage: `url(/storage/${comment.user.avatar})` }}
                />
                <div>
                    <div className='flex'>
                        <h3 className="font-semibold dark:text-white">{comment.user.name}</h3>
                        <span className="text-gray-500 dark:text-gray-200">  •@{comment.user.username}</span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-100 text-xs">{formattedDate}</span>
                </div>
            </div>

            <p className="text-gray-700 pl-16 dark:text-white">{comment.content}</p>
        </div>
    );
};

export default Comment;
