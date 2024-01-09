import React from 'react';
import Post from './Post';

const Posts = () => {

    const posts = [
        {
            id: "1",
            username: "Aashir",
            userImg: "https://avatars.githubusercontent.com/u/117041814?v=4",
            img: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
            caption: "Nice picture"
        },

        {
            id: "2",
            username: "Warren",
            userImg: "https://avatars.githubusercontent.com/u/117041814?v=4",
            img: "data:image/jpeg;base64,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",
            caption: "Nice Flower!"
        },
    ]

    return (
        <div>
            {
                posts.map((post) => (
                    <Post key={post.id} id={post.id} username={post.username} userImg={post.userImg} img={post.img} caption={post.caption} />
                ))
            }
        </div>
    )
}

export default Posts;