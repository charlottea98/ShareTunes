export interface Comment {
    id: string,
    date: any,
    emailOfPublisher: string,
    usernameOfPublisher: string,
    comment: string
}

export interface Followee {
    id: string,
    followers: Array<string>
}

export interface Follower {
    id: string,
    following: Array<string>
}

export interface Post {
    id: string,
    caption: string,
    rating: number,
    tags: Array<string>,
    postImageURL: string,
    songId: string,
    usernameOfPublisher: string,
    emailOfPublisher: string,
    profilePictureOfPublisher: string,
    likes: Array<string>,
    comments: Array<Comment>,
    date: any,
    deleted: boolean
}

export interface Artist {
    id: string,
    name: string
}

export interface Song {
    id: string,
    title: string,
    artists: Array<Artist>,
    albumCoverURL: string,
    previewURL: string | null,
}

export interface User {
    id: string,
    name: string,
    email: string,
    username: string,
    profilePictureURL: string | null,
    favoriteSong: string | null,
    biography: string,
    posts: Array<string>
}
