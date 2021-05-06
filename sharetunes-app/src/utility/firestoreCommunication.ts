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

    addNewSong("1XvrMOEi2oLFYdrkfIX3xG");
    addNewSong("54rjlka9h5VCl8ugns7gvt");
    addNewSong("5nNmj1cLH3r4aA4XDJ2bgY");

    // Add new users
    let userToAdd1 : User = {
        id: 'rrudling@kth.se',
        name: "Rasmus Rudling",
        email: 'rrudling@kth.se',
        username: "rasmusrudling",
        profilePictureURL: createImageLinkFromDriveId("1GnZSOEI94lljIswu601Cu3lFDtvExwPb"),
        favoriteSong: "4aaEV6V9aOQb2oQzWlf9cu",
        biography: "Songs are cool",
        posts: []
    }

    let userToAdd2 : User = {
        id: 'charande@kth.se',
        name: "Lotta Andersson",
        email: 'charande@kth.se',
        username: "lottaandersson",
        profilePictureURL: createImageLinkFromDriveId("1nfCENDyYTWQMAtWsDYCNQjBk3oIjStr1"),
        favoriteSong: "1XvrMOEi2oLFYdrkfIX3xG",
        biography: "Music is my life",
        posts: []
    }

    let userToAdd3 : User = {
        id: 'johanlam@kth.se',
        name: "Johan Lam",
        email: 'johanlam@kth.se',
        username: "johanlam",
        profilePictureURL: createImageLinkFromDriveId("106Y8mMGHIE5_JPSo6Id9gv5-rQgiS5Vw"),
        favoriteSong: "7723JnKU2R15Iv4T7OJrly",
        biography: "Muusic is the best",
        posts: []
    }

    let userToAdd4 : User = {
        id: 'isakpet@kth.se',
        name: "Isak Movitz Pettersson",
        email: 'isakpet@kth.se',
        username: "isakmovitzpettersson",
        profilePictureURL: createImageLinkFromDriveId("1L5iHyRF6Ai6nJy9CIqee6eTaquykT0ef"),
        favoriteSong: "3LmpQiFNgFCnvAnhhvKUyI",
        biography: "Muuuusic is awsome",
        posts: []
    }

    addNewUser(userToAdd1);
    addNewUser(userToAdd2);
    addNewUser(userToAdd3);
    addNewUser(userToAdd4);

    // Add new post
    let postToAdd1: Post = {
        id: -1,
        caption: "Denna låten var bra! :)",
        rating: 3,
        tags: ["Tagg"],
        postImageURL: createImageLinkFromDriveId("10ANTVpvP4crwarzLLlxGLs4ilJab5kmK"),
        song: "4aaEV6V9aOQb2oQzWlf9cu",
        postedBy: "rrudling@kth.se",
        likes: 4,
        comments: [1, 2],
        date: new Date(),
        deleted: false
    };

    let postToAdd2: Post = {
        id: -1,
        caption: "sooooft",
        rating: 4,
        tags: ["Lugn"],
        postImageURL: createImageLinkFromDriveId("1SJ9G6CaASo9QKysPlnBcQY5Bo2Kzw0rO"),
        song: "5nNmj1cLH3r4aA4XDJ2bgY",
        postedBy: "charande@kth.se",
        likes: 4,
        comments: [],
        date: new Date(),
        deleted: false
    };

    let postToAdd3: Post = {
        id: -1,
        caption: "bäst",
        rating: 5,
        tags: ["Chill", "Sommar", "annat"],
        postImageURL: createImageLinkFromDriveId("1BwAehUC9llxQDoIkaQdZm6yOH29K7lV5"),
        song: "54rjlka9h5VCl8ugns7gvt",
        postedBy: "johanlam@kth.se",
        likes: 4,
        comments: [],
        date: new Date(),
        deleted: false
    };

    let postToAdd4: Post = {
        id: -1,
        caption: "Jättekul :))))",
        rating: 4,
        tags: [],
        postImageURL: createImageLinkFromDriveId("1tKc382TgI7tLiZB0uOisfQ_yIL-26t_5"),
        song: "3LmpQiFNgFCnvAnhhvKUyI",
        postedBy: "isakpet@kth.se",
        likes: 4,
        comments: [],
        date: new Date(),
        deleted: false
    };

    // addNewPost(postToAdd1);
    // addNewPost(postToAdd2);
    // addNewPost(postToAdd3);
    addNewPost(postToAdd4);
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
    allPostsFromUser = allPostsFromUser.filter(post => !post.deleted);
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


export const getAllRelevantPosts = async (userId: string, page: "home page" | "discover page") => {
    const followingSnapshot = await firebase.firestore().collection('following').doc(userId).get();
    let userIsFollowingData = followingSnapshot.data();
    let userIsFollowing = userIsFollowingData?.following;
    console.log(userIsFollowing);


    const userSnapshot = await firebase.firestore().collection('users').doc(userId).get();
    let userData = userSnapshot.data();
    let postIds = userData?.posts;

    const postSnapshot = await firebase.firestore().collection('posts').get();
    let allPosts = postSnapshot.docs.map(post => post.data());

    let allPostsFromUser: Array<Post> = postIds.map((postId: number) => allPosts[postId]);
    allPostsFromUser = allPostsFromUser.filter(post => !post.deleted);
    return allPostsFromUser;
}