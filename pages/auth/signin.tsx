"use client";

import React, { useState, useEffect } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, User } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-hot-toast';
import Header from '@/components/Header';
import { useRouter } from 'next/router';

const SignIn= () => {

  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setUser(user);
      } else {
        setUser(null);
      }
    })
    // eslint-disable-next-line
  }, [router]);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      router.push('/');
      toast.success(`Logged in successfully`);
      saveCookie(result.user);
    } catch (error) {
      console.error(error);
    }
  }

  const saveCookie = (user: User) => {
    const { photoURL, displayName, email } = user;
    const username = displayName?.split(" ").join("_").toLocaleLowerCase();
    localStorage.setItem('user', JSON.stringify({ photoURL, displayName, email, username }));
  }

  return (
    <>
      <Header />
      <div className='flex justify-center space-x-7 mt-20'>
        <img
          className='hidden object-cover rotate-6 md:inline-flex md:w-48'
          src="https://img.freepik.com/free-photo/pile-3d-instagram-logos_1379-876.jpg?w=740&t=st=1704521838~exp=1704522438~hmac=b79e96bd3ac73f41874aff2a9ee6b07f79d12b0e0aac035b78907c4082194ef9"
          alt="Instagram"
        />
        <div>
          <div className='flex flex-col items-center'>
            <img className='w-32 object-cover' src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png" alt="Instagram" />
            <p className='text-sm italic my-10 text-center'>
                This application is created for learning purposes
            </p>
            <button onClick={handleGoogleLogin} className='bg-red-400 rounded-lg p-3 text-white hover-bg-red-500'>
                Signin with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
