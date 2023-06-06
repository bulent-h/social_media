
import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, children, props }) {
    return (
        <>
            <Link
                {...props}
            >
                <div className={'px-3 hover:bg-blue-50 ' +
                    (active
                        && 'bg-blue-100'
                    )
                }
                >
                    <div className='ml-4 w-full text-xl  py-4 text-gray-700 dark:text-gray-300'>
                        {children}
                    </div>
                </div>
            </Link>
        </>
    );
}
