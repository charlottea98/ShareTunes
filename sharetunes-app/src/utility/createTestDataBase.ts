import firebase from 'firebase';
import { Post } from './types';
// import fire from "../../../fire";


const createImageLinkFromDriveId = (id: string) => {
    return `https://drive.google.com/uc?export=view&id=${id}`
}


export const createNewPost = async () => {
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

// var today = new Date();
// var dd = String(today.getDate()).padStart(2, '0');
// var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
// var yyyy = today.getFullYear();

// today = mm + '/' + dd + '/' + yyyy;
// document.write(today);