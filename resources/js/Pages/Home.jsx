import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Stories from '@/Components/Stories';
import Post from '@/Components/Post'; // Import the Post component

export default function Home({ auth }) {

    const [posts, setPosts] = useState([]);

    const updateUserStatus = async (status) => {
        try {
            await axios.post(route('status.update'), { status });
        } catch (error) {
            console.error('Failed to update user status', error);
        }
    };

    const handleBeforeUnload = (event) => {
        event.preventDefault();
        updateUserStatus('offline');
    };

    // Register the beforeunload event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    useEffect(() => {
        updateUserStatus('online');
        const channelStatus = Echo.join('user-status');
        channelStatus.listen('UserStatusUpdated', function (data) {
            // console.log('User status updated:', data.user);
        });

        // Fetch the posts
        axios.get('/friends-posts')
            .then(response => {
                setPosts(response.data.posts);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch posts', error);
            });

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            Echo.leave('user-status');
            // Clean up the beforeunload event listener when the component is unmounted
        };
    }, []);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Home" />
            <Stories></Stories>
            {/* Render the posts */}
            {posts.map(singlePost => (
                <Post
                    user={singlePost.user}
                    auth={auth}
                    initialPost={singlePost.post}
                    key={singlePost.post.id}
                />
            ))}
        </AuthenticatedLayout>
    );
}
