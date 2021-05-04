import firebase from 'firebase';
import { Post, Song, User } from './types';

import { SpotifyAPI } from './spotifyCommunication';

import { createImageLinkFromDriveId } from './utility';

export const addNewPost = async (newPost: Post) => {
    const snapshot = await firebase.firestore().collection('posts').get()
    snapshot.docs.map(doc => console.log(doc.data()));
    newPost.id = snapshot.docs.length;

    firebase.firestore().collection('posts').doc(String(newPost.id)).set(newPost);
}

export const addNewSong = async (songId: string) => {
    const snapshot = await firebase.firestore().collection('songs').get();
    const song_already_exsist = snapshot.docs.some(doc => doc.data().id === songId);

    if (song_already_exsist) {
        console.error('Song already exist');
    } else {
        let songData = await SpotifyAPI.getSongDetails(songId);
        let newSong : Song = {
            id: songId,
            title: songData.name,
            artists: songData.artists.map((artist: any) => artist.id),
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
}


export const addNewUser = async (newUser: User) => {
    const snapshot = await firebase.firestore().collection('users').get();
    const email_already_exsist = snapshot.docs.some(doc => doc.data().email === newUser.email);
    
    if (email_already_exsist) {
        console.error('Email already exist');
    } else {
        firebase.firestore().collection('users').doc(newUser.email).set(newUser);
        console.log("New user added")
    }
}


const deleteCollectionData = async (collection: string) => {
    const snapshot = await firebase.firestore().collection(collection).get();

    const ids = snapshot.docs.map(doc => doc.data().id);

    ids.forEach(id => {
        firebase.firestore().collection(collection).doc(id).delete()
            .then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
    })
}

export const createDataBase = (collectionsToDelete: Array<string>) => {
    collectionsToDelete.forEach(collection => deleteCollectionData(collection));

    // Add new songs
    addNewSong("5qYf19BLOheApfe6NqhDPg");
    addNewSong("4aaEV6V9aOQb2oQzWlf9cu");

    // Add new users
    let email = 'rasmus@kth.se';
    let userToAdd : User = {
        id: email,
        name: "Rasmus Rudling",
        email: email,
        username: "rasmusrudling",
        profilePictureURL: createImageLinkFromDriveId("1pYIMKBLGubCmw78RAxDDhbm98PyOlY6Y"),
        favoriteSong: "4aaEV6V9aOQb2oQzWlf9cu",
        biography: "Songs are cool",
        posts: []
    }
    addNewUser(userToAdd);

    // Add new post
    let postToAdd: Post = {
        caption: "Denna låten var bra! :)",
        rating: 3,
        tags: ["Chill", "Sommar", "annat"],
        postImageURL: createImageLinkFromDriveId("1c26_sQEcyIeF-txMLd-FglSMLmEM5lWA"),
        song: "ab67616d00001e02908280d9807127e185b71d56",
        postedBy: "rrudling@kth.se",
        likes: 4,
        comments: [1, 2],
        date: new Date(),
        deleted: false
    };
    addNewPost(postToAdd);
}

export const getUserInfo = async (userId: string) => {
    const userSnapshot = await firebase.firestore().collection('users').doc(userId).get();
    return userSnapshot.data();
}

export const getSongInfo = async (songId: string) => {
    const songSnapshot = await firebase.firestore().collection('songs').doc(songId).get();
    return songSnapshot.data();
}

export const getAllPostsFromUser = async (userId: string) => {
    const userSnapshot = await firebase.firestore().collection('users').doc(userId).get();
    let userData = userSnapshot.data();
    let postIds = userData?.posts;

    const postSnapshot = await firebase.firestore().collection('posts').get();
    let allPosts = postSnapshot.docs.map(post => post.data());
    let allPostsFromUser: Array<Post> = postIds.map((postId: number) => allPosts[postId]);

    return allPostsFromUser;
}