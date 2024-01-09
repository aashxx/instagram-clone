import React from 'react';
import Story from './Story';
import Posts from './Posts';
import MiniProfile from './MiniProfile';
import Suggestions from './Suggestions';

const Feed = () => {
  return (
    <main className='grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto'>
        <section className='md:col-span-2'>
            <Story />
            <Posts />
        </section>
        <section className='hidden md:inline-grid md:col-span-1'>
          <div className='fixed w-[380px]'>
            <MiniProfile />
            <Suggestions />
          </div>
        </section>
    </main>
  )
}

export default Feed;