"use client";

import React, { useEffect, useState } from 'react';
import minifaker from 'minifaker';
import "minifaker/locales/en";
import StoryUser from './StoryUser';


const Story = () => {

    const [storyUsers, setStoryUsers] = useState([]);

    useEffect(() => {
        const storyUsers = minifaker.array(20, (i: string) => ({
            username: minifaker.username({locale: 'en'}).toLowerCase(),
            img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random()*70)}`,
            id: i
        }));

        setStoryUsers(storyUsers);    
    }, []);

    return (
        <div>
            {
                storyUsers.map((user) => (
                    <StoryUser key={user.id} username={user.username} img={user.img} />
                ))
            }
        </div>
    )
}

export default Story;