import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import { useRef, useState, useEffect } from 'react';
import DangerButton from '@/Components/DangerButton';
import TextInput from '@/Components/TextInput';
import { Inertia } from '@inertiajs/inertia';


export default function UpdateBlockForm({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const [searchBlockedModal, setSearchBlockedModal] = useState(false);
    const [searchToBlockModal, setSearchToBlockModal] = useState(false);

    const [blockedUsers, setBlockedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
    });


    const handleEditClick = () => {
        setSearchBlockedModal(true);
    };


    const closeModal = () => {
        setSearchBlockedModal(false);
        // reset();
    };
    const handleEditClick2 = () => {
        setSearchToBlockModal(true);
    };
    const closeModal2 = () => {
        setSearchToBlockModal(false);
        // reset();
    };


    function handleUnblockUser(user) {

        axios.post(route('user.unblock.post', { user: user }))
            .then((response) => {
                fetchUsers();
                // setBlockedUsers((prevBlockedUsers) =>
                //     prevBlockedUsers.filter(
                //         (blockedUser) => blockedUser.id !== unblocked.id
                //     )
                // );
            })
            .catch(error => {
                console.error('Error unblocking user:', error);
            });

    };
    function handleBlockUser(user) {

        axios.post(route('user.block', { user: user }))
            .then((response) => {
                handleSearch()
                fetchUsers();

            })
            .catch(error => {
                console.error('Error unblocking user:', error);
            });

    };

    function fetchUsers() {
        fetch(route('block.users'))
            .then(response => response.json())
            .then(data => {
                setBlockedUsers(data);
                // console.log(data)
            })
            .catch(error => {
                console.error('Error fetching blocked users:', error);
            });
    }
    const filteredBlockedUsers = blockedUsers.filter(user =>
        user.blocked.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetchUsers();
    }, []);
    console.log('run')


    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);

    const handleSearch = async () => {
        const response = await axios.get(route('search.users',{query}));
        setUsers(response.data);
    };


    return (
        <section className={className}>

            <form className="mt-6 space-y-6">

                <div className='grid grid-cols-12 gap-4'>

                    <div className='my-4 col-span-12 grid grid-cols-12 gap-4'>
                        <div className='col-start-2 col-span-5 flex items-center justify-start '>

                            <InputLabel className="font-mono" value="Blocked Users" />
                        </div>
                        <div className='col-end-12 col-span-4 flex items-center justify-end'>
                            <SecondaryButton onClick={handleEditClick2} className='mx-4'>Add</SecondaryButton>
                            <SecondaryButton onClick={handleEditClick}>Remove</SecondaryButton>
                        </div>

                        <InputError className="mt-2" message={errors.stories} />
                    </div>


                    <div className='my-4 col-span-12 grid grid-cols-12 gap-4'>
                        <div className='col-end-12 col-span-2 flex items-center justify-end '>
                            <PrimaryButton disabled={processing}>Save</PrimaryButton>
                        </div>
                        <Transition
                            show={recentlySuccessful}
                            enterFrom="opacity-0"
                            leaveTo="opacity-0"
                            className="transition ease-in-out "
                        >
                            <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                        </Transition>
                    </div>
                </div>
            </form>
            <Modal show={searchBlockedModal} onClose={closeModal}>
                <div className='bg-white dark:bg-gray-900 p-6'>
                    <div className="py-4 px-6 bg-white dark:bg-gray-900 w-96 ">

                        <div className="flex flex-row px-4 py-1 items-center w-full bg-gray-100 dark:bg-gray-700 rounded-full text-gray-900 dark:text-gray-400 ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                <path
                                    d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z">
                                </path>
                            </svg>

                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-300 focus:border-gray-100 focus:ring-gray-100 text-sm focus:ring-0 border-0"
                                placeholder="Search" />
                        </div>
                    </div>
                    <div className="h-96 overflow-auto">


                        {filteredBlockedUsers.map(user => (
                            <div key={user.blocked.id}>
                                <div className="grid grid-cols-12 bg-white dark:bg-gray-900 px-3 py-3 text-gray-700 dark:text-gray-300 ">
                                    <div className='col-span-2'>
                                        <div
                                            className=" bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400 bg-origin-padding w-12 h-12 rounded-full"
                                            style={(user.blocked.avatar) && { backgroundImage: `url(/storage/${user.blocked.avatar})` }}
                                        >
                                        </div>
                                    </div>
                                    <div className="col-span-7 ml-3 flex items-center">
                                        <div className="truncate text-sm font-mono overflow-hidden">
                                            {user.blocked.name}
                                        </div>
                                    </div>
                                    <div className="col-span-3 flex items-center justify-center">
                                        <button onClick={() => handleUnblockUser(user.blocked)} className="border rounded-xl p-2 text-xs">
                                            Unblock
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </Modal>



            <Modal show={searchToBlockModal} onClose={closeModal2}>
                <div className='bg-white dark:bg-gray-900 p-6'>
                    <div className="py-4 px-6 bg-white dark:bg-gray-900 w-96 ">

                        <div className="flex flex-row px-4 py-1 items-center w-full bg-gray-100 dark:bg-gray-700 rounded-full text-gray-900 dark:text-gray-400 ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                <path
                                    d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z">
                                </path>
                            </svg>

                            <input
                                type="text"
                                value={query} onChange={(e) => setQuery(e.target.value)}
                                className="w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-300 focus:border-gray-100 focus:ring-gray-100 text-sm focus:ring-0 border-0"
                                placeholder="Search" />
                            <button onClick={handleSearch}>Search</button>

                        </div>
                    </div>
                    <div className="h-96 overflow-auto">

                        {users.map(user => (
                            <div key={user.id}>
                                <div className="grid grid-cols-12 bg-white dark:bg-gray-900 px-3 py-3 text-gray-700 dark:text-gray-300 ">
                                    <div className='col-span-2'>
                                        <div
                                            className=" bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400 bg-origin-padding w-12 h-12 rounded-full"
                                            style={(user.avatar) && { backgroundImage: `url(/storage/${user.avatar})` }}
                                        >
                                        </div>
                                    </div>
                                    <div className="col-span-8 ml-3 flex items-center">
                                        <div className="truncate text-sm font-mono overflow-hidden">
                                            {user.name}
                                        </div>
                                    </div>
                                    <div className="col-span-2  flex items-center justify-center ">
                                        <button onClick={() => handleBlockUser(user)} className="border rounded-xl p-2 text-xs">
                                            Block
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </Modal>
        </section >
    );
}
