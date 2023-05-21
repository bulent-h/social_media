import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    const containerStyle = {
        borderRadius: '80px 1px 80px 1px',
        backgroundImage: 'linear-gradient(to bottom right, #6C12CB, #ABF9F9)',

    };
    return (
        <>
            <div style={{
                backgroundSize: 'cover',
                backgroundImage: "url('background.png')",
            }}
                className="min-h-screen bg-gradient-to-r from-indigo-500- flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">

                <div style={containerStyle}
                    className="w-fit xl:w-1/4 mt-6 px-10 py-12 opacity-80  drop-shadow-2xl overflow-hidden">

                    <div className="grid justify-items-center place-content-center pb-10">
                        <div >
                            <Link href="/login">
                                <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                            </Link>
                        </div>

                        <div >
                            {children}
                        </div>
                    </div>
                </div>
            </div >
        </>

    );
}
