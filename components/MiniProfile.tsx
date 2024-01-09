"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase';

const MiniProfile = () => {

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

  return (
    <div className='flex items-center justify-between mt-14 ml-10 text-black'>
      {
        storedUser && (
          <>
            <img className='h-16 rounded-full border p-[2px]' src={storedUser?.photoURL} alt="Me" />
            <div className='flex-1 ml-4'>
              <h2 className='font-bold'>
                {storedUser?.username}
              </h2>
              <h3 className='text-sm text-gray-400'>
                Welcome to Instagram
              </h3>
            </div>
            <button onClick={handleSignOut} className='font-semibold text-sm text-blue-400'>
              Sign Out
            </button>
          </>
        )
      }
    </div>
  )
}

export default MiniProfile;