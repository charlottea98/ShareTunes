export interface Comment {
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
    rating: 1 | 2 | 3 | 4 | 5,
    tags: Array<string>,
    postImageURL: string,
    song: Song,
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
    posts: Array<number>
}
