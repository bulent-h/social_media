import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Stories from '@/Components/Stories';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Inertia } from '@inertiajs/inertia';
import Dropdown from '@/Components/Dropdown';

dayjs.extend(relativeTime);

export default function ViewStory({ user, stories }) {

    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [indexes, setIndexes] = useState(null);
    const [currentStory, setCurrentStory] = useState(stories[0]);

    function handleNext() {
        if (stories.length > currentStoryIndex + 1) {
            setCurrentStory(stories[currentStoryIndex + 1])
            setCurrentStoryIndex(currentStoryIndex + 1)
        }
    }
    function handlePrev() {
        if (0 <= currentStoryIndex - 1) {
            setCurrentStory(stories[currentStoryIndex - 1])
            setCurrentStoryIndex(currentStoryIndex - 1)
        }
    }
    async function handleDelete() {
        await axios.post(route('story.destroy', currentStory))
    }
    return (
        <div className="bg-black ">
            <div className="py-2 flex items-center justify-center h-screen">
                <div className='h-full py-4'>
                    <div className="bg-gray-800 relative  rounded-2xl shadow-lg w-full h-full" style={{ width: '30em' }}>
                        <div onClick={() => handleNext()} className="absolute inset-y-0 -right-10 bg-transparent z-10 flex items-center" >
                            <p className=' text-3xl font-bold text-gray-200 cursor-pointer'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-chevron-right"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M9 6l6 6l-6 6" />
                                </svg>
                            </p>
                        </div >
                        <div onClick={() => handlePrev()} className="absolute inset-y-0 -left-10 bg-transparent z-10 flex items-center" >
                            <p className=' text-3xl font-bold text-gray-200 cursor-pointer'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-chevron-left"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M15 6l-6 6l6 6" />
                                </svg>
                            </p>
                        </div >
                        {/* <div onClick={() => handlePrev()} className="absolute inset-0  bg-transparent z-10 flex items-center" >
                            <p className=' text-3xl font-bold text-gray-200 cursor-pointer'>
                                    text
                            </p>
                        </div > */}
                        <div className="absolute bottom-0 left-0 w-full  bg-transparent z-10 " >
                            <div className='bg-white opacity-40 rounded-b-xl'>
                                <p className='text-lg font-bold text-black cursor-pointer p-2 '>
                                    {currentStory.content}
                                </p>
                            </div>
                        </div>

                        <div className="absolute top-6 right-2 bg-transparent z-10 flex items-center" >
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <div
                                        className="ml-3 text-gray-900 dark:text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26">
                                            <path fill="#ffffff"
                                                d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z">
                                            </path>
                                        </svg>
                                    </div>
                                </Dropdown.Trigger>
                                <Dropdown.Content contentClasses='py-2 bg-white dark:bg-gray-900'>
                                    <div className='bg-white'>
                                        <Dropdown.Link onClick={handleDelete} className="flex justify-center px-12 bg-white dark:bg-gray-900">
                                            Delete
                                        </Dropdown.Link>
                                    </div>
                                </Dropdown.Content>

                            </Dropdown>
                        </div>
                        {(stories) &&
                            <>

                                <div className="absolute top-3 bg-transparent z-10 flex w-full" >
                                    {
                                        stories.map((story) => (
                                            < div key={story.id}
                                                className={'mx-2 rounded-full bg-white opacity-25 h-1 w-full ' + ((currentStory.id == story.id)
                                                    && 'bg-white opacity-95')}></div>
                                        ))
                                    }
                                </div >
                                <div className="absolute top-6 bg-transparent z-10 flex items-center " >
                                    <a href={route('user.show', user)} className='mx-4'>
                                        <div
                                            className=" bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400 bg-origin-padding w-12 h-12 rounded-full"
                                            style={(user.avatar) && { backgroundImage: `url(/storage/${user.avatar})` }}>
                                        </div>
                                    </a>

                                    <a href={route('user.show', user)} className=''>

                                        <div className='text-white'>
                                            <p>{user.name}</p>
                                            <p>{dayjs(currentStory?.created_at).fromNow()}</p>
                                        </div>
                                    </a>

                                </div>

                                <div className="flex items-center justify-center h-full overflow-hidden">
                                    {(currentStory) &&
                                        <>
                                            {
                                                (currentStory.media_type == 'image') ?
                                                    <div
                                                        className=" bg-contain bg-no-repeat bg-center  h-full bg-origin-padding w-full"
                                                        style={{ backgroundImage: `url(/storage/${currentStory?.media_url})` }}

                                                    >
                                                    </div>
                                                    :
                                                    < video controls autoPlay
                                                        src={'/storage/' + currentStory.media_url}>
                                                    </video >
                                            }
                                        </>
                                    }
                                    {(stories.length != 0 && currentStory == null) &&
                                        <video controls autoPlay className=' mfkewlmfekwl'
                                            src={'/storage/' + stories[0].media_url}>
                                        </video >
                                    }
                                </div>
                            </>
                        }
                    </div>

                </div>

                <div className='absolute top-0 right-0  px-4 py-3 m-3 rounded-full hover:scale-110 cursor-pointer'>
                    <a href={route('home')}
                        className='shrink-0 justify-end text-gray-100  font-bold  text-2xl'>
                        &#10005;
                    </a>
                </div>
            </div>



        </div>


    );
}
