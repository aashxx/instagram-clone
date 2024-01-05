import React from 'react';

interface StoryUserTypes {
    img: string,
    username: string
}

const StoryUser: React.FC<StoryUserTypes> = ({img, username}) => {
  return (
    <div>
        <img src={img} alt={username} />
        <p>{username}</p>
    </div>
  )
}

export default StoryUser;