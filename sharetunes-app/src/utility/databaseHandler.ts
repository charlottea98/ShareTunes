import firebase from 'firebase';
import fire from '../fire';
import { createImageLinkFromDriveId, DEFAULT_PROFILE_PICTURE_URL } from '../utility/utility';
import { SpotifyAPI } from './spotifyHandler';
import { User, Post, Comment, Song } from './types';

const db = firebase.firestore();
const storage = firebase.storage();

export const DatabaseHandler = {
    // === ADD ===
    async addNewPost(newPost: any) {
        db.collection('posts').add(newPost)
            .then(docRef => {
                db.collection('posts').doc(docRef.id).update({id: docRef.id})
                .then(()=>{
                    console.log(newPost.publisherId);
                    db.collection('users').doc(newPost.publisherId).update({
                        posts: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                });
                })
            })
    },
    async addNewUser(newUser: User) {
        const snapshot = await firebase.firestore().collection('users').get();
        const email_already_exsist = snapshot.docs.some(doc => doc.data().email === newUser.email);
        
        if (!email_already_exsist) {
            firebase.firestore().collection('users').doc(newUser.email).set(newUser);
            firebase.firestore().collection('followers').doc(newUser.email).set({
                "id": newUser.email,
                "followers": []
            });
    
            firebase.firestore().collection('following').doc(newUser.email).set({
                "id": newUser.email,
                "following": []
            });

            return "New user created";
        } else {
            return "Email already exist";
        }
    },
    async addNewSong(songId: string) {
        const snapshot = await firebase.firestore().collection('songs').doc(songId).get();
    
        if (!snapshot.exists) {
            let songData = await SpotifyAPI.getSongDetails(songId);
            let newSong : Song = {
                id: songId,
                title: songData.name,
                artists: songData.artists.map((artist: any) => ({
                    id: artist.id,
                    name: artist.name
                })),
                albumCoverURL: songData.album.images[2].url,
                previewURL: songData.preview_url,
            }
            firebase.firestore().collection('songs').doc(songId).set(newSong);
        }
    },
    async addNewComment(postId: string, newComment: any) {
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
        DatabaseHandler.addNewSong("3LmpQiFNgFCnvAnhhvKUyI");
        DatabaseHandler.addNewSong("54rjlka9h5VCl8ugns7gvt");
        DatabaseHandler.addNewSong("2grjqo0Frpf2okIBiifQKs");
        DatabaseHandler.addNewSong("2grjqo0Frpf2okIBiifQKs");
        
    
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
    async loginUser(email: string, password: string) {
        let returnMessage;

        await fire.auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            sessionStorage.setItem('user-session', email);
            returnMessage = "User logged in successfully";
        })
        .catch((err) => {
            switch (err.code) {
                case 'auth/invalid-email':
                case 'auth/user-disabled':
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    returnMessage = err.message;
                break;
            }
        });

        return returnMessage;
    },
    async signUpUser(name: string, username:string, pictureURL: string, email: string, password: string) {
        let returnMessage;
        
        await fire.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                DatabaseHandler.addNewUser({
                    id: email,
                    email: email,
                    name: name,
                    username: username,
                    biography: "",
                    favoriteSong: null,
                    profilePictureURL: pictureURL !== "" ? pictureURL : DEFAULT_PROFILE_PICTURE_URL,
                    posts: []
                })
                
                sessionStorage.setItem('user-session', email);
                returnMessage = "New user added in database";
            })
            .catch((err) => {
                switch (err.code) {
                    case 'auth/email-already-in-use':
                    case 'auth/invalid-email':
                    case 'auth/weak-password':
                        returnMessage = err.message;
                    break;
                }
            });

        return returnMessage;
    },
    async logoutUser() {
        let returnMessage;

        await fire.auth().signOut()
            .then(msg => {returnMessage = msg})
            .catch(error => {returnMessage = error})

        return returnMessage;
    },

    // === STORAGE ===
    async uploadImage(imageFile: any, imageCategory: "users" | "posts") {
        let fileURL;

        if (imageFile) {
            let fileType = String(imageFile.type).slice(6);
            let fileId = `${String(Date.now())}.${fileType}`;
            let storageRef = storage.ref(`images/${imageCategory}/${fileId}`);
            let uploadTask = storageRef.put(imageFile);
    
    
            await uploadTask.then(() => {
                fileURL = storageRef.getDownloadURL();
            })
        }

        return fileURL ? fileURL : "";
    },
}