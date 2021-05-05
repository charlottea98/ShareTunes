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
        firebase.firestore().collection('followers').doc(newUser.email).set({
            "id": newUser.email,
            "followers": []
        });

        firebase.firestore().collection('following').doc(newUser.email).set({
            "id": newUser.email,
            "following": []
        });

        console.log("New user added");
    }
}


const deleteCollectionsData = async (collectionsToDelete: Array<string>) => {
    collectionsToDelete.forEach(async (collection) => {
        let snapshot;

        if (collection === 'followers' || collection === 'following') {
            snapshot = await firebase.firestore().collection("users").get();
        }
        snapshot = await firebase.firestore().collection(collection).get();

        let ids;

        if (collection === 'users') {
            ids = snapshot.docs.map(doc => doc.data().email);
        } else {
            ids = snapshot.docs.map(doc => doc.data().id);
        }

        console.log(ids)
        
        ids.forEach(id => {
            firebase.firestore().collection(collection).doc(String(id)).delete()
                .then(() => {
                    console.log("Document successfully deleted!");
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
        })
    });
}

export const createDataBase = async () => {
    // deleteCollectionsData(['users', 'songs', 'posts', 'followers', 'following']);
    // deleteCollectionsData(['users']);

    // Add new songs
    addNewSong("5qYf19BLOheApfe6NqhDPg");
    addNewSong("4aaEV6V9aOQb2oQzWlf9cu");

    // Add new users
    let email = 'rrudling@kth.se';
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
        id: -1,
        caption: "Denna låten var bra! :)",
        rating: 3,
        tags: ["Chill", "Sommar", "annat"],
        postImageURL: createImageLinkFromDriveId("1c26_sQEcyIeF-txMLd-FglSMLmEM5lWA"),
        song: "4aaEV6V9aOQb2oQzWlf9cu",
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

export const updateUserProfilePicture = async (newProfilePicture: string, email: string) => {
    const currentUserRef = firebase
            .firestore()
            .collection('users')
            .doc(email);

    currentUserRef.update({profilePictureURL: newProfilePicture});
}

export const deletePost = async (postId: number) => {
    const currentUserRef = firebase
    .firestore()
    .collection('posts')
    .doc(String(postId));

    currentUserRef.update({deleted: true});
}