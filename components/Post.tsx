import React from 'react';
import { FaRegHeart } from "react-icons/fa";
import { GoKebabHorizontal } from 'react-icons/go';
import { MdOutlineEmojiEmotions } from 'react-icons/md';

interface PostTypes {
    img: string,
    userImg: string,
    caption: string,
    username: string,
    id: string
}

const Post: React.FC<PostTypes> = ({img, userImg, caption, username, id}) => {
  return (
    <div className='bg-white my-7 border rounded-md text-black'>
        <div className='flex items-center p-5'>
            <img src={userImg} alt={username} className='h-12 rounded-full object-cover border p-1 mr-3' />
            <p className='font-bold flex-1'>
                {username}
            </p>
            <div className='text-lg'>
                <GoKebabHorizontal />
            </div>
        </div>

        <img className='object-cover w-full' src={img} alt="Server Not Found" />

        <p className='p-5 truncate'>
            <span className='font-bold mr-2'>
                {username}
            </span>
            {caption}
        </p>

        <form className='flex items-center p-4'>
            <div className='text-3xl mr-2'>
                <MdOutlineEmojiEmotions />
            </div>
            <input type="text" className='border-none flex-1 focus:ring-0 p-2' placeholder='Enter your comment...' />
            <button className='text-blue-400 font-bold'>
                Post
            </button>
        </form>
    </div>
  )
}

export default Post;