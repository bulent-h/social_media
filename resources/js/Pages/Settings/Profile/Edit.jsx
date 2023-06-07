import SettingsLayout from '@/Layouts/SettingsLayout';
import UpdateProfileInformationForm from '@/Pages/Settings/Profile/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <SettingsLayout
            user={auth.user}
        >
            <Head title="Profile" />

            <div>
                <div className=" mx-auto  sm:px-6  lg:px-8 space-y-6">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className=""
                    />

                </div>
            </div>
        </SettingsLayout>
    );
}
