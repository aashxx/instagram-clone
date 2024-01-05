import React from 'react';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
  return (
    <div className='shadow-sm border-b sticky bg-white z-30 top-0'>
        <div className='flex items-center justify-between max-w-6xl mx-4 xl:mx-auto'>
            {/* Left  */}
            <div className='cursor-pointer h-24 w-24 relative hidden lg:inline-grid'>
                <Image src={"https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"} alt='Instagram' layout='fill' className='object-contain relative' />
            </div>
            <div className='cursor-pointer h-24 w-10 relative lg:hidden'>
                <Image src={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png"} alt='Instagram' layout='fill' className='object-contain' />
            </div>
            {/* middle */}
            <div className='relative mt-1'>
                <div className='flex items-center'>
                    <p className='text-gray-500 absolute left-2'>
                        <FaSearch />
                    </p>
                    <input type="text" placeholder='Search' className='bg-gray-50 pl-10 py-1 border-2 border-gray-500 text-gray-500 text-sm focus:ring-black focus:border-black rounded-md' />
                </div>

            </div>

            {/* right */}
        </div>
    </div>
  )
}

export default Header;