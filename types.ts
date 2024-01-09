interface StoryUserTypes {
    img: string,
    username: string,
    isUser?: boolean
}

interface StoryUserType {
    username: string;
    img: string;
    id: string;
}

interface PostTypes {
    image: string,
    userImg: string,
    caption: string,
    username: string,
    id: string
}

interface User {
    photoURL: string,
    displayName: string,
    email: string,
    username: string
}