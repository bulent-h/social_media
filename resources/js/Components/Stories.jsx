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
        < div className="sticky top-0 bg-white py-2 px-4 z-10  overflow-x-scroll" >
            <div className='flex '>

                <div className='shrink-0 m-2 border-2 h-20 w-20  rounded-full '>
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
                        <div  key={user.id} className=" flex-col items-center justify-center w-24 mx-2">
                            <div>
                                < a href={route('story.show', { story: user.stories[0], user: user })}  className="">
                                    <div
                                        className='shrink-0 m-2 border-2 h-20 w-20 bg-gray-200  rounded-full bg-center bg-cover bg-no-repeat'
                                        style={(user.avatar) && { backgroundImage: `url(/storage/${user.avatar})` }}>
                                    </div>
                                </a>
                            </div>
                            <div className="flex items-center justify-center ">
                                <p className=" truncate whitespace-nowrap">{user.name}</p>
                            </div>
                        </div>

                    )

                    )
                }

            </div>

        </div >
    )
}
