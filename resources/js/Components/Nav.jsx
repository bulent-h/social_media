
import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, children, ...props }) {
    return (
        <>
            <Link
                {...props}
            >
                <div className={'px-3 hover:bg-blue-50  dark:hover:bg-blue-900 ' +
                    (active
                        && 'bg-blue-100 dark:bg-blue-700'
                    )
                }
                >
                    <div className=' pl-8 w-full text-lg  py-4 text-gray-700 dark:text-gray-300'>
                        {children}
                    </div>
                </div>
            </Link>
        </>
    );
}
