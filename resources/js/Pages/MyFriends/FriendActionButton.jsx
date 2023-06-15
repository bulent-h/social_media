import React from 'react';

const FriendActionButton = ({ label, color, action }) => {
    return (
        <button
            onClick={action}
            className={`bg-${color}-600 hover:bg-${color}-700 text-white py-2 px-4 rounded-full`}
        >
            {label}
        </button>
    );
};

export default FriendActionButton;
