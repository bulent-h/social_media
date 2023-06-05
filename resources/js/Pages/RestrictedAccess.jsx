import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const RestrictedAccess = () => (
    <AuthenticatedLayout>
        <Head title="Restricted Access" />
        <h1>Sorry, you don't have permission to view this page.</h1>
    </AuthenticatedLayout>
);

export default RestrictedAccess;
