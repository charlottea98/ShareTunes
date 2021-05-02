export interface Post {
    id: number,
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