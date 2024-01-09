"use client";

import React, { useEffect, useState } from 'react';
// @ts-ignore
import minifaker from 'minifaker';
import "minifaker/locales/en";
import StoryUser from './StoryUser';


const Story = () => {

    const [storyUsers, setStoryUsers] = useState<StoryUserType[]>([]);

    const [storedUser, setStoredUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUserString = localStorage.getItem('user');
        const parsedUser: User | null = storedUserString ? JSON.parse(storedUserString) : null;
        setStoredUser(parsedUser);
    }, []);

    useEffect(() => {
        const storyUsers: StoryUserType[] = minifaker.array(20, (i: string) => ({
            username: minifaker.username({locale: 'en'}).toLowerCase(),
            img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random()*70)}`,
            id: i
        }));

        setStoryUsers(storyUsers);    
    }, []);

    return (
        <div className='flex space-x-2 p-6 bg-white mt-8 border-gray-200 border-2 overflow-x-scroll rounded-sm scrollbar-none'>
            {
                storedUser && (
                    <StoryUser username={storedUser.username} img={storedUser.photoURL} isUser={true}/>
                )
            }
            {
                storyUsers.map((user) => (
                    <StoryUser key={user.id} username={user.username} img={user.img} />
                ))
            }
        </div>
    )
}

export default Story;