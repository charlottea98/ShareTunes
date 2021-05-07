import firebase from 'firebase';
import { createImageLinkFromDriveId, DEFAULT_PROFILE_PICTURE_URL } from '../utility/utility';
import { SpotifyAPI } from './spotifyCommunication';
import { User, Post, Comment, Song } from './types';

const db = firebase.firestore();

export const DatabaseHandler = {
    // === ADD ===
    async addNewPost(newPost: Post) {
        firebase.firestore().collection('posts').add(newPost)
            .then(docRef => {
                firebase.firestore().collection('posts').doc(docRef.id).update({id: docRef.id})
            });
    },
    async addNewUser(newUser: User) {
        const snapshot = await firebase.firestore().collection('users').get();
        const email_already_exsist = snapshot.docs.some(doc => doc.data().email === newUser.email);
        
        if (!email_already_exsist) {
            newUser.profilePictureURL = DEFAULT_PROFILE_PICTURE_URL;
            firebase.firestore().collection('users').doc(newUser.email).set(newUser);
            firebase.firestore().collection('followers').doc(newUser.email).set({
                "id": newUser.email,
                "followers": []
            });
    
            firebase.firestore().collection('following').doc(newUser.email).set({
                "id": newUser.email,
                "following": []
            });
        } else {
            return "Email already exist!"
        }
    },
    async addNewSong(songId: string) {
        const snapshot = await firebase.firestore().collection('songs').get();
        const song_already_exsist = snapshot.docs.some(doc => doc.data().id === songId);
    
        if (!song_already_exsist) {
            let songData = await SpotifyAPI.getSongDetails(songId);
    
            let newSong : Song = {
                id: songId,
                title: songData.name,
                artists: songData.artists.map((artist: any) => ({
                    id: artist.id,
                    name: artist.name
                })),
                albumCoverURL: songData.album.images[0].url,
                previewURL: songData.preview_url,
            }
        
            firebase.firestore().collection('songs').add(newSong)
                .then(docRef => {
                    firebase.firestore().collection('songs').doc(docRef.id).update({id: docRef.id})
                });
        }
    },
    async addNewComment(postId: string, newComment: Comment) {
        if (newComment.comment !== "") {
            const postData : any = await firebase.firestore().collection('posts').doc(postId).get();
            const post : Post = postData.data();
    
            let newComments = [...post.comments];
    
            newComments = [...newComments, newComment];
    
            db.collection('posts').doc(postId).update({
                comments: newComments
            })
        }
    },
    async addNewLike(postId: string, userId: string) {
        const postData : any = await firebase.firestore().collection('posts').doc(postId).get();
        const post : Post = postData.data();

        const user_already_likes_post = post.likes.some(currentUserId => currentUserId === userId);
        let newLikes = [...post.likes];

        if (user_already_likes_post) {
            newLikes = newLikes.filter(currentUserId => currentUserId !== userId);
        } else {
            newLikes = [...newLikes, userId];
        }

        db.collection('posts').doc(postId).update({
            likes: newLikes
        })
    },
    checkIfSongExists(songId: string) {

    },
    checkIfUserExists(userId: string) {

    },

    // === DELETE ===
    deletePost(postId: string) {
        db.collection('posts').doc(postId).update({deleted: true});
    },
    async deleteComment(postId: string, commentId: string) {
        const postData : any = await firebase.firestore().collection('posts').doc(postId).get();
        const post : Post = postData.data();
        let newComments = post.comments;
        newComments = newComments.filter(comment => comment.id !== commentId);
        
        db.collection('posts').doc(postId).update({comments: newComments});
    },

    // === UPDATE ===
    updateUserInfo(newUserInfo: User) {
        db.collection('users').doc( newUserInfo.email).set({
            id: newUserInfo.id,
            name:  newUserInfo.name,
            username:  newUserInfo.username,
            email: newUserInfo.email,
            profilePictureURL: newUserInfo.profilePictureURL,
            posts: newUserInfo.posts,
            favoriteSong: newUserInfo.favoriteSong,
            biography: newUserInfo.biography
        }) 
    }, 

    // === OTHER ===
    createCleanDatabase() {
        // Add new songs
        DatabaseHandler.addNewSong("5qYf19BLOheApfe6NqhDPg");
        DatabaseHandler.addNewSong("4aaEV6V9aOQb2oQzWlf9cu");
    
        DatabaseHandler.addNewSong("1XvrMOEi2oLFYdrkfIX3xG");
        DatabaseHandler.addNewSong("54rjlka9h5VCl8ugns7gvt");
        DatabaseHandler.addNewSong("5nNmj1cLH3r4aA4XDJ2bgY");
    
        // Add new users
        let userToAdd1 : User = {
            id: 'rrudling@kth.se',
            name: "Rasmus Rudling",
            email: 'rrudling@kth.se',
            username: "rasmusrudling",
            profilePictureURL: "https://drive.google.com/uc?export=view&id=1GnZSOEI94lljIswu601Cu3lFDtvExwPb",
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
    
        DatabaseHandler.addNewUser(userToAdd1);
        DatabaseHandler.addNewUser(userToAdd2);
        DatabaseHandler.addNewUser(userToAdd3);
        DatabaseHandler.addNewUser(userToAdd4);
    
        // Add new post
        let postToAdd1: Post = {
            id: "-1",
            caption: "Denna låten var bra! :)",
            rating: 3,
            tags: ["Tagg"],
            postImageURL: createImageLinkFromDriveId("10ANTVpvP4crwarzLLlxGLs4ilJab5kmK"),
            songId: "4aaEV6V9aOQb2oQzWlf9cu",
            usernameOfPublisher: "rasmusrudling",
            emailOfPublisher: "rrudling@kth.se",
            profilePictureOfPublisher: createImageLinkFromDriveId("1GnZSOEI94lljIswu601Cu3lFDtvExwPb"),
            likes: [],
            comments: [],
            date: new Date(),
            deleted: false
        };
    
        let postToAdd2: Post = {
            id: "-1",
            caption: "sooooft",
            rating: 4,
            tags: ["Lugn"],
            postImageURL: createImageLinkFromDriveId("1SJ9G6CaASo9QKysPlnBcQY5Bo2Kzw0rO"),
            songId: "5nNmj1cLH3r4aA4XDJ2bgY",
            usernameOfPublisher: "lottaandersson",
            emailOfPublisher: "charande@kth.se",
            profilePictureOfPublisher: createImageLinkFromDriveId("1nfCENDyYTWQMAtWsDYCNQjBk3oIjStr1"),
            likes: [],
            comments: [],
            date: new Date(),
            deleted: false
        };
    
        let postToAdd3: Post = {
            id: "-1",
            caption: "bäst",
            rating: 5,
            tags: ["Chill", "Sommar", "annat"],
            postImageURL: createImageLinkFromDriveId("1BwAehUC9llxQDoIkaQdZm6yOH29K7lV5"),
            songId: "54rjlka9h5VCl8ugns7gvt",
            usernameOfPublisher: "johanlam",
            emailOfPublisher: "johanlam@kth.se",
            profilePictureOfPublisher: createImageLinkFromDriveId("106Y8mMGHIE5_JPSo6Id9gv5-rQgiS5Vw"),
            likes: [],
            comments: [],
            date: new Date(),
            deleted: false
        };
    
        let postToAdd4: Post = {
            id: "-1",
            caption: "Jättekul :))))",
            rating: 4,
            tags: [],
            postImageURL: createImageLinkFromDriveId("1tKc382TgI7tLiZB0uOisfQ_yIL-26t_5"),
            songId: "3LmpQiFNgFCnvAnhhvKUyI",
            usernameOfPublisher: "isakmovitzpettersson",
            emailOfPublisher: "isakpet@kth.se",
            profilePictureOfPublisher: createImageLinkFromDriveId("1L5iHyRF6Ai6nJy9CIqee6eTaquykT0ef"),
            likes: [],
            comments: [],
            date: new Date(),
            deleted: false
        };
    
        DatabaseHandler.addNewPost(postToAdd1);
        DatabaseHandler.addNewPost(postToAdd2);
        DatabaseHandler.addNewPost(postToAdd3);
        DatabaseHandler.addNewPost(postToAdd4);
    },
    loginUser(email: string, password: string) {
        // Return error eller OK
        // TODO
    },
    signUpUser(name: string, username:string, email: string, password: string) {
        DatabaseHandler.addNewUser({
            id: email,
            email: email,
            name: name,
            username: username,
            biography: "",
            favoriteSong: null,
            profilePictureURL: null,
            posts: []
        })
    },
    logoutUser() {
        // TODO
    },
}