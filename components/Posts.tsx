import React, { useEffect, useState } from 'react';
import Post from './Post';
import { collection, onSnapshot, orderBy, query, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';

const Posts = () => {

    const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "posts"), orderBy("createdAt", "desc")), 
                (snapshot) => {
                    setPosts(snapshot.docs);
                }
            );

        return unsubscribe;

    }, [db]);

    return (
        <div>
            {
                posts.map((post) => (
                    <Post key={post.id} username={post.data().username} userImg={post.data().profileImg} image={post.data().image} caption={post.data().caption} />
                ))
            }
        </div>
    )
}

export default Posts;