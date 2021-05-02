import firebase from 'firebase';
import { Post, Song } from './types';

import { SpotifySource } from './spotifySource';


const createImageLinkFromDriveId = (id: string) => {
    return `https://drive.google.com/uc?export=view&id=${id}`
}


export const addNewPost = async () => {
    const snapshot = await firebase.firestore().collection('posts').get()
    snapshot.docs.map(doc => console.log(doc.data()));
    let newPostId = snapshot.docs.length;
    let newPost: Post = {
        id: newPostId,
        caption: "Denna låten var bra! :)",
        rating: 3,
        tags: ["Chill", "Sommar"],
        postImageURL: createImageLinkFromDriveId("1c26_sQEcyIeF-txMLd-FglSMLmEM5lWA"),
        song: "ab67616d00001e02908280d9807127e185b71d56",
        postedBy: "rrudling@kth.se",
        likes: 4,
        comments: [1, 2],
        date: new Date(),
        deleted: false
    };

    firebase.firestore().collection('posts').doc(String(newPostId)).set(newPost);
}

export const addNewSong = async () => {
    let songId = "4aaEV6V9aOQb2oQzWlf9cu";
    let songData = await SpotifySource.getSongDetails(songId);
    
    let newSong : Song = {
        id: songId,
        title: songData.name,
        artists: songData.artists.map((artist: any) => artist.name),
        albumCoverSmallURL: songData.album.images[2].url,
        albumCoverMediumURL: songData.album.images[1].url,
        albumCoverLargeURL: songData.album.images[0].url,
        songPreviewURL: songData.preview_url,
        posts: [],
        totalLikes: 0,
        totalPosts: 0,
        avarageRating: null
    }

    firebase.firestore().collection('songs').doc(songId).set(newSong);
}
