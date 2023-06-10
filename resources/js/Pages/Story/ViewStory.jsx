import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import Stories from '@/Components/Stories';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function ViewStory({ user, stories, story }) {

    console.log(stories);

    return (
        <div className="bg-black ">


            <div className="py-2 flex items-center justify-center h-screen">
                <div className='h-full py-4'>

                    <div className="bg-gray-600 relative  rounded-2xl overflow-hidden shadow-lg w-full h-full" style={{ width: '30em' }}>


                        <div className="sticky top-5 bg-transparent z-10 flex" >
                            {
                                stories.map((story) => (
                                    < a key={story.id} href={route('story.show', { user, story })} className={'mx-2 rounded-full bg-white opacity-25 h-1 w-full ' + (route().current('story.show', { user, story })
                                        && 'bg-white opacity-95')}></a>
                                ))
                            }
                        </div >
                        <div className="sticky top-10 bg-transparent z-10 flex items-center " >
                            <a href={route('user.show', user)} className='mx-4'>
                                <div
                                    className=" bg-center bg-cover bg-no-repeat bg-gray-200 dark:bg-gray-400 bg-origin-padding w-12 h-12 rounded-full"
                                    style={(user.avatar) && { backgroundImage: `url(/storage/${user.avatar})` }}>
                                </div>
                            </a>

                            <a href={route('user.show', user)} className=''>

                                <div className='text-white'>
                                    <p>{user.name}</p>
                                    <p>{dayjs(story.created_at).fromNow()}</p>
                                </div>
                            </a>

                        </div>

                        <div className="flex items-center justify-center h-full">
                            {(story) &&
                                <>
                                    {
                                        (story.media_type == 'image') ?
                                            <div
                                                className=" bg-contain bg-no-repeat bg-center  h-full bg-origin-padding w-full"
                                                style={{ backgroundImage: `url(/storage/${story?.media_url})` }}

                                            >
                                            </div>
                                            :
                                            < video controls autoPlay
                                                src={'/storage/' + story.media_url}>
                                            </video >


                                    }
                                </>

                            }
                            {(stories.length != 0 && story == null) &&
                                <video controls autoPlay className=' mfkewlmfekwl'
                                    src={'/storage/' + stories[0].media_url}>
                                </video >
                            }

                        </div>

                    </div>

                </div>

                <div className='absolute top-0 right-0 hover:bg-red-500 px-4 py-3 m-3 rounded-full'>
                    {/* <button id="removeBtn" type='button' onClick={handleRemoveFile} className="text-red-500 dark:text-red-500 hover:text-gray-200 mx-1">&#10005;</button> */}
                    < a href={route('home')} className='shrink-0 justify-end text-red-300 text-2xl'>&#10005;</a>
                </div>


            </div>
        </div >


    );
}
