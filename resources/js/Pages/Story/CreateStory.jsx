import SettingsLayout from '@/Layouts/SettingsLayout';
import { Head } from '@inertiajs/react';
import CreateForm from '@/Pages/Story/CreateForm'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function CreateStory({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Profile" />

            <div>
                <div className=" mx-auto  sm:px-6  lg:px-8 space-y-6">
                <CreateForm></CreateForm>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
