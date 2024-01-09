import React from 'react';
import { FaCirclePlus } from 'react-icons/fa6';

const StoryUser: React.FC<StoryUserTypes> = ({img, username, isUser}) => {
  return (
    <div className='relative group cursor-pointer'>
        <img className='h-14 rounded-full p-[1.5px] border-red-500 border-2 cursor-pointer hover:scale-110 transition-all duration-200 ease-out' src={img} alt={username} />
        {
          isUser && (
            <p className='absolute top-10 left-10 text-blue-400 bg-white'>
              <FaCirclePlus />
            </p>
          )
        }
        <p className='text-xs w-14 truncate text-black'>
            {username}
        </p>
    </div>
  )
}

export default StoryUser;