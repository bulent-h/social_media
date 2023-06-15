import { usePage } from "@inertiajs/react"
import { useEffect, useState } from "react";


export default function Stories() {
    const user = usePage().props.auth.user;
    const [users, setUsers] = useState();

    async function fetchStories() {
        await axios.get(route('stories.get'))
            .then((data) => {
                setUsers(data.data);
                console.log(data.data)
            }).catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        fetchStories()
    }, [])
    return (
        < div className="sticky top-0 bg-white py-1 px-4 z-50 border-b-2 overflow-x-auto" >
            <div className='flex  '>

                <div className='shrink-0 m-2 border-2 h-16 w-16  rounded-full '>
                    <a href={route('story.create')}>
                        <div className='opacity-25 h-full flex items-center justify-center'

                            style={{ fontSize: '35px' }}>✚</div>
                    </a>
                </div>

                {/* <div className='shrink-0 m-2 border-2 h-20 w-20  rounded-full bg-center bg-cover bg-no-repeat'
                    style={(user.avatar) && { backgroundImage: `url(/storage/${user.avatar})` }}>
                </div> */}
                {(users) &&
                    users.map((user) => (
                        (user.stories.length != 0) &&
                        <a key={user.id} href={route('story.show', { story: user.stories[0], user: user })} className="">

                            <div  className="flex flex-col items-center justify-center w-20 mx-1">
                                <div
                                    className='shrink-0 m-1 border-1 h-16 w-16 bg-gray-200  rounded-full bg-center bg-cover bg-no-repeat'
                                    style={(user.avatar) && { backgroundImage: `url(/storage/${user.avatar})` }}>
                                </div>

                                <div className="flex items-center justify-center">
                                    <p className="w-20 text-xs truncate whitespace-nowrap">{user.name}</p>
                                </div>
                            </div>
                        </a>


                    )

                    )
                }

            </div>

        </div >
    )
}
