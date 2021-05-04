export interface Post {
    id?: number,
    caption: string,
    rating: 1 | 2 | 3 | 4 | 5,
    tags: Array<string>,
    postImageURL: string,
    song: string,
    postedBy: string,
    likes: number,
    comments: Array<number>,
    date: Date,
    deleted: boolean
}

export interface PostCardInfo {
    caption: string,
    rating: 1 | 2 | 3 | 4 | 5,
    tags: Array<string>,
    postImageURL: string,
    songTitle: string,
    artists: Array<string>,
    albumCover: string,
    usernameOfPublisher: string,
    profilePictureOfPublisher: string,
    likes: number,
    comments: Array<number>,
    date: any,
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

export interface Comment {
    id: number,
    comment: string,
    post: string,
    postedBy: string,
    date: Date,
    deleted: boolean
}


export interface Artist {
    id: string,
    name: string,
    totalLikes: number,
    totalPosts: number
}

export interface Song {
    id: string,
    title: string,
    artists: Array<string>,
    albumCoverSmallURL: string,
    albumCoverMediumURL: string,
    albumCoverLargeURL: string,
    songPreviewURL: string,
    posts: Array<number>,
    totalLikes: number,
    totalPosts: number,
    avarageRating: number | null
}

