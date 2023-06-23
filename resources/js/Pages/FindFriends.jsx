import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import SearchBar from '@/Components/SearchBar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const FindFriends = () => {
    const { auth, users, keyword } = usePage().props;
    const [searchTerm, setSearchTerm] = useState(keyword || '');
    const [searchResults, setSearchResults] = useState([]);
    const [visitedUsers, setVisitedUsers] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    useEffect(() => {
        // Update the visited users and search history
        const updateHistory = () => {
            const updatedVisitedUsers = [...visitedUsers];
            if (!updatedVisitedUsers.includes(auth.user.id)) {
                updatedVisitedUsers.push(auth.user.id);
            }
            setVisitedUsers(updatedVisitedUsers);

            const updatedSearchHistory = [...searchHistory];
            if (searchTerm && !updatedSearchHistory.includes(searchTerm)) {
                updatedSearchHistory.push(searchTerm);
            }
            setSearchHistory(updatedSearchHistory);
        };

        updateHistory();
    }, [auth.user.id, searchTerm]);

    useEffect(() => {
        // Implement your search logic here
        // You can make an API call to fetch search results based on the searchTerm

        // Example: Simulating search results
        const results = users.filter(
            (user) =>
                user.id !== auth.user.id &&
                (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.username.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        setSearchResults(results);
    }, [searchTerm, auth.user.id, users]);

    const handleClearSearchHistory = () => {
        setSearchHistory([]);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Find Friends" />
            <div className='flex justify-center'>
                <div className='w-11/12 mt-6'>
                    <div className='mb-4'>
                        <SearchBar searchTerm={searchTerm} onSearchTermChange={handleSearch} />
                    </div>
                    {searchTerm && (
                        <>
                            {/* {searchHistory.length > 0 && (
                                    <div>
                                        <div className='flex justify-between mx-2 mt-6'>
                                            <h2>Search History:</h2>
                                            <button onClick={handleClearSearchHistory}>Clear</button>
                                        </div>
                                        <ul>
                                            {searchHistory.map((term, index) => (
                                                <li key={index}>{term}</li>
                                            ))}
                                        </ul>

                                </div>
                            )} */}
                            {searchResults.length === 0 ? (
                                <p className='mt-4'>No users found.</p>
                            ) : (
                                <ul >
                                    {searchResults.map((user) => (
                                        <li key={user.id} className="flex items-center space-x-4 mb-4">
                                            <a href={route('user.show', { user: user.id })} className="flex items-center space-x-4 hover:underline">
                                                <div
                                                    className="bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400 bg-origin-padding w-12 h-12 rounded-full"
                                                    style={{ backgroundImage: `url(storage/${user.avatar})` }}
                                                ></div>
                                                <div>
                                                    <p className="font-bold">{user.username}</p>
                                                    <p>{user.name}</p>
                                                </div>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default FindFriends;
