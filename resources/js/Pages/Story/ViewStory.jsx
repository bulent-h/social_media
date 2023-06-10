import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import Stories from '@/Components/Stories';
export default function ViewStory({ user, stories, story }) {

    console.log(stories);

    return (
        <div className="bg-black">

            <div className=" mx-auto bg-black h-screen overflow-hidden">

                <div className="py-2 flex items-center justify-center " >

                    <div className=" border border-gray-100 border-0 rounded shadow-lg h-screen w-96 ">

                        <div className="sticky top-0 bg-white px-4 z-10 flex" >
                            < a href={route('home')} className='shrink-0 m-2 justify-end '>X</a>

                            < a href={route('story.create')} className='m-2 border-2 border-red-500 h-4 w-10 '></a>
                            {
                                stories.map((story) => (
                                    < a key={story.id} href={route('story.show', { user, story })} className='m-2 border-2 border-red-500 h-4 w-10 '></a>
                                ))
                            }
                        </div >

                        <div className="flex items-center justify-center border h-full w-96">
                            {(story) &&
                                <>
                                    {
                                        (story.media_type == 'image') ?
                                            <div
                                                className=" bg-contain bg-no-repeat bg-center bg-gray-200 dark:bg-gray-700 h-96  bg-origin-padding w-full"
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
            </div>
        </div >


    );
}
