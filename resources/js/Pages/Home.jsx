import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect ,useState} from 'react';
import Stories from '@/Components/Stories';
import Modal from '@/Components/Modal';
import CreateForm from '@/Pages/Story/CreateForm'

export default function Home({ auth }) {

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
        updateUserStatus('online')
        const channelStatus = Echo.join('user-status');
        channelStatus.listen('UserStatusUpdated', function (data) {
            // console.log('User status updated:', data.user);
        });

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
            <Stories></Stories>

        </AuthenticatedLayout>
    );
}
