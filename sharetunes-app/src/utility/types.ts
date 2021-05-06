export interface Comment {
    date: any,
    postedBy: string,
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
    id: number,
    caption: string,
    rating: 1 | 2 | 3 | 4 | 5,
    tags: Array<string>,
    postImageURL: string,
    song: Song,
    usernameOfPublisher: string,
    emailOfPublisher: string,
    likes: Array<string>,
    comments: Array<Comment>,
    date: Date,
    deleted: boolean
}

export interface Song {
    id: string,
    title: string,
    artists: Array<string>,
    albumCoverURL: string,
    previewURL: string,
}


export interface User {
    id: string,
    name: string,
    email: string,
    username: string,
    profilePictureURL: string,
    favoriteSong: string,
    biography: string,
    posts: Array<number>
}
