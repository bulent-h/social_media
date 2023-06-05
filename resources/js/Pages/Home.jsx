import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
export default function Home({ auth }) {



    const updateUserStatus = async (status) => {
        console.log('updateUserStatus run')
        try {
            await axios.post(route('status.update'), { status });
            console.log('User status updated successfully');
        } catch (error) {
            console.error('Failed to update user status', error);
        }
    };

    const handleBeforeUnload = (event) => {
        console.log('beforeunload run')
        event.preventDefault();
        updateUserStatus('offline');
    };
    // Register the beforeunload event listener
    window.addEventListener('beforeunload', handleBeforeUnload);


    useEffect(() => {
        console.log('mounted');
        updateUserStatus('online')
        // const channelStatus = Echo.join('user-status');
        // channelStatus.listen('UserStatusUpdated', function (data) {
        //     console.log('User status updated:', data.user);
        // });

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            Echo.leave('user-status');
            // Clean up the beforeunload event listener when the component is unmounted
        }
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Home" />


        </AuthenticatedLayout>
    );
}
