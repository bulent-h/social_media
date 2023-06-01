import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Home({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Home" />

            
        </AuthenticatedLayout>
    );
}
