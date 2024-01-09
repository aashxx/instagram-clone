"use client";

import React, { useState, useEffect } from 'react';
import minifaker from 'minifaker';
import 'minifaker/locales/en';

interface SuggestionsType {
    username: string,
    jobTitle: string,
    id: string
}

const Suggestions = () => {

    const [suggestions, setSuggestions] = useState<SuggestionsType[]>([]);

    useEffect(() => {
        const suggestions = minifaker.array(5, (i: string) => ({
            username: minifaker.username({locale: 'en'}).toLowerCase(),
            jobTitle: minifaker.jobTitle(),
            id: i
        }));

        setSuggestions(suggestions);

    }, []);

    return (
        <div className='mt-4 ml-10'>
            <div className='flex justify-between mb-5 text-sm'>
                <h3 className='font-bold text-gray-400'>
                    Suggestions for you
                </h3>
                <button className='text-gray-600 font-semibold'>
                    See All
                </button>
            </div>
            {
                suggestions.map((suggestion) => (
                        <div className='flex items-center justify-between mt-3'>
                            <img className='h-12 rounded-full border p-[2px]' src={`https://i.pravatar.cc/150?img=${Math.ceil(Math.random()*70)}`} alt="img" />
                            <div className='flex-1 ml-4'>
                                <h2 className='font-semibold text-sm text-black'>
                                    {suggestion.username}
                                </h2>
                                <h3 className='text-sm text-gray-400 truncate w-[230px]'>
                                    {suggestion.jobTitle}
                                </h3>
                            </div>
                            <button className='font-semibold text-blue-400 text-sm'>
                                Follow
                            </button>
                        </div>
                ))
            }
        </div>
    )
}

export default Suggestions;