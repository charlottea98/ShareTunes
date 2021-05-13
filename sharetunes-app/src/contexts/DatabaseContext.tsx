import React, { useState, useContext, createContext, useEffect } from 'react';
import firebase from 'firebase';

import { Followee, Follower, Post, Song, User } from './../utility/types';


interface Followers {
    [key: string]: Followee
}

interface Following {
    [key: string]: Follower
}

interface Posts {
    [key: string]: Post
}

interface Songs {
    [key: string]: Song
}

interface Users {
    [key: string]: User
}

interface Database {
    followers: Followers,
    following: Following,
    posts: Posts,
    songs: Songs,
    users: Users
}

const DatabaseContext = createContext<Database>({
    followers: {},
    following: {},
    posts: {},
    songs: {},
    users: {}
});



export const useDatabase = () => {
    return useContext(DatabaseContext);
};

const LoggedInUserProvider: React.FC = ({ children }) => {
    const db = firebase.firestore();

    const [followers, setFollowers] = useState<Followers>({});
    const [following, setFollowing] = useState<Following>({});
    const [posts, setPosts] = useState<Posts>({});
    const [songs, setSongs] = useState<Songs>({});
    const [users, setUsers] = useState<Users>({});

    useEffect(() => {
        let followersRef = db.collection('followers');
        followersRef.where('id', '!=', "").onSnapshot(querySnapshot => {
            let followersFromDatabase: any = {};

            querySnapshot.forEach(doc => {
                let docId = doc.data().id;
                followersFromDatabase[docId] = doc.data();
            });
            
            setFollowers(followersFromDatabase);
        });

        let followingRef = db.collection('following');
        followingRef.where('id', '!=', "").onSnapshot(querySnapshot => {
            let followingFromDatabase: any = {};

            querySnapshot.forEach(doc => {
                let docId = doc.data().id;
                followingFromDatabase[docId] = doc.data();
            });
            
            setFollowing(followingFromDatabase);
        });

        let songsRef = db.collection('songs');
        songsRef.where('id', '!=', "").onSnapshot(querySnapshot => {
            let songsFromDatabase: any = {};

            querySnapshot.forEach(doc => {
                let docId = doc.data().id;
                songsFromDatabase[docId] = doc.data();
            });
            
            setSongs(songsFromDatabase);
        });

        let usersRef = db.collection('users');
        usersRef.where('id', '!=', "").onSnapshot(querySnapshot => {
            let usersFromDatabase: any = {};

            querySnapshot.forEach(doc => {
                let docId = doc.data().id;
                usersFromDatabase[docId] = doc.data();
            });
            setUsers(usersFromDatabase);

            let postsRef = db.collection('posts');
            postsRef.where('id', '!=', "").onSnapshot(querySnapshot => {
                let postsFromDatabase: any = {};
    
                querySnapshot.forEach(doc => {
                    let docId = doc.data().id;
                    let post = doc.data();

                    postsFromDatabase[docId] = post;
                });

                let postsIds = Object.keys(postsFromDatabase);
    
                postsIds.forEach(postId => {
                    let publisherId = postsFromDatabase[postId].publisherId;
                    delete postsFromDatabase[postId].publisherId;
                    let publisher = usersFromDatabase[publisherId];
                    
                    postsFromDatabase[postId].usernameOfPublisher = publisher.username;
                    postsFromDatabase[postId].emailOfPublisher = publisher.email;
                    postsFromDatabase[postId].profilePictureOfPublisher = publisher.profilePictureURL;

                    let postComments : Array<Comment> = [];
                    postsFromDatabase[postId].comments.forEach((comment: any) => {
                        let newComment = {...comment};
                        let commentPublisherId = newComment.publisherId;
                        let commentPublisher = usersFromDatabase[commentPublisherId];
                        newComment.emailOfPublisher = commentPublisher.email;
                        newComment.usernameOfPublisher = commentPublisher.username;
                        delete newComment.publisherId;

                        postComments.push(newComment);
                    })
                    postsFromDatabase[postId].comments = postComments;
                })

                setPosts(postsFromDatabase);
            });
        });
    }, []);

    return (
        <DatabaseContext.Provider value={{
            followers: followers,
            following: following,
            posts: posts,
            songs: songs,
            users: users
        }}>
            {children}
        </DatabaseContext.Provider>
    );
};

export default LoggedInUserProvider;
