"use client";

import React, { useState, useEffect} from 'react';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';
import { GoHomeFill } from "react-icons/go";
import { auth } from '@/firebase';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalState } from '@/atom/modalAtom';


const Header = () => {

    const router = useRouter();
    const [storedUser, setStoredUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUserString = localStorage.getItem('user');
        const parsedUser: User | null = storedUserString ? JSON.parse(storedUserString) : null;
        setStoredUser(parsedUser);
    }, []);

    const handleSignOut = () => {
        auth.signOut();
        localStorage.removeItem('user');
        router.reload();
    }

    const [open, setOpen] = useRecoilState(modalState);

    return (
        <div className='shadow-sm border-b sticky bg-white z-30 top-0'>
            <div className='flex items-center justify-between max-w-6xl mx-4 xl:mx-auto'>
                {/* Left  */}
                <div className='cursor-pointer h-24 w-24 relative hidden lg:inline-grid'>
                    <Image src={"https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"} onClick={() => router.push('/')} alt='Instagram' layout='fill' className='object-contain relative' />
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
                <div className='flex space-x-4 items-center'>
                    <button onClick={() => router.push('/')} className='text-2xl hidden md:inline-flex cursor-pointer hover:scale-125 transition-transform duration-200 ease-out'>
                        <GoHomeFill />
                    </button>
                    {
                        storedUser ? (
                            <>
                                <button onClick={() => setOpen(true)} className='text-2xl cursor-pointer hover:scale-125 transition-transform duration-200 ease-out'>
                                    <FaCirclePlus />
                                </button>
                                <button onClick={handleSignOut} id='profile'>
                                    <img src={storedUser.photoURL} alt="userPic" className='h-10 rounded-full cursor-pointer' />
                                </button>
                            </>
                        ) : (
                            <button onClick={() => router.push('/auth/signin')}>
                                Sign In
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Header;