import React, { useEffect, useState, FormEvent } from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { GoKebabHorizontal } from 'react-icons/go';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { FaRegBookmark } from 'react-icons/fa6';
import { DocumentData, QueryDocumentSnapshot, addDoc, collection, onSnapshot, orderBy, serverTimestamp, query, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Moment from 'react-moment';

const Post: React.FC<PostTypes> = ({image, userImg, caption, username, id}) => {

    const [storedUser, setStoredUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUserString = localStorage.getItem('user');
        const parsedUser: User | null = storedUserString ? JSON.parse(storedUserString) : null;
        setStoredUser(parsedUser);
    }, []);

    const [comment, setComment] = useState("");

    const postComment = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const commentToPost = comment;
        setComment("");

        await addDoc(collection(db, "posts", id, "comments"), {
            comment: commentToPost,
            username: storedUser?.username,
            userImage: storedUser?.photoURL,
            createdAt: serverTimestamp()
        });
    }

    const [comments, setComments] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "posts", id, "comments"),
                orderBy('createdAt', 'desc')
            ), (snapshot) => {
                setComments(snapshot.docs);
            }
        );

        return unsubscribe;

    }, [db, id])

    const [likes, setLikes] = useState<QueryDocumentSnapshot<DocumentData>[]> ([]);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "posts", id, "likes"),
            (snapshot) => {
                setLikes(snapshot.docs);
            }
        );

        return unsubscribe;
    }, [db]);

    useEffect(() => {
        setHasLiked(likes.findIndex((like) => like.id === storedUser?.email) !== -1);
        console.log(hasLiked);
    }, [likes]);

    const likePost = async () => {
        if (!storedUser?.email) {
            return;
        }

        if(hasLiked) {
            await deleteDoc(doc(db, "posts", id, "likes", storedUser.email))
        } else {
            await setDoc(doc(db, "posts", id, "likes", storedUser.email), {
                username: storedUser?.username
            });
        }
    };


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

            <img className='object-cover w-full' src={image} alt="Server Not Found" />

            {
                storedUser && (
                    <div className='flex justify-between px-4 pt-4'>
                        <div className='flex space-x-4'>
                            {
                                hasLiked ? (
                                    <button className='btn text-red-400' onClick={likePost}>
                                        <FaHeart />
                                    </button>
                                ) : (
                                    <button className='btn' onClick={likePost}>
                                        <FaRegHeart />
                                    </button>
                                )
                            }
                            <button className='btn'>
                                <IoChatbubbleOutline />
                            </button>
                        </div>
                        <button className='btn'>
                            <FaRegBookmark />
                        </button>
                    </div>
                )
            }

            <p className='p-5 truncate'>
                {
                    likes.length > 0 && (
                        <p className='font-bold mb-1'>
                            {likes.length} likes
                        </p>
                    )
                }
                <span className='font-bold mr-2'>
                    {username}
                </span>
                {caption}
            </p>

            {
                comments.length > 0 && (
                    <div className='mx-10 max-h-24 overflow-y-scroll scrollbar-none'>
                        {
                            comments.map((comment) => (
                                <div className='flex items-center space-x-2 mb-2'>
                                    <img className='h-7 rounded-full object-cover' src={comment.data().userImage} alt="user" />
                                    <p className='font-semibold'>
                                        {comment.data().username}
                                    </p>
                                    <p className='flex-1 truncate'>
                                        {comment.data().comment}
                                    </p>
                                    <Moment fromNow>
                                        {comment.data().createdAt?.toDate()}
                                    </Moment>
                                </div>
                            ))
                        }
                    </div>
                )
            }

            {
                storedUser && (
                    <form onSubmit={postComment} className='flex items-center p-4'>
                        <div className='text-3xl mr-2'>
                            <MdOutlineEmojiEmotions />
                        </div>
                        <input type="text" value={comment} onChange={ (event) => setComment(event.target.value) } className='border-none flex-1 focus:ring-0 p-2' placeholder='Enter your comment...' />
                        <button type='submit' disabled={!comment.trim()} className='text-blue-400 font-bold disabled:text-blue-200'>
                            Post
                        </button>
                    </form>
                )
            }
        </div>
    )
}

export default Post;