import React, { useState, useContext, createContext, useEffect } from 'react';
import firebase from 'firebase';

import { Followee, Follower, Post, Song, User } from './../utility/types';

interface Database {
    followers: Array<Followee>,
    following: Array<Follower>,
    posts: Array<Post>,
    songs: Array<Song>,
    users: Array<User>
}

const DatabaseContext = createContext<Database>({
    followers: [],
    following: [],
    posts: [],
    songs: [],
    users: []
});

export const useDatabase = () => {
    return useContext(DatabaseContext);
};

const LoggedInUserProvider: React.FC = ({ children }) => {
    const db = firebase.firestore();

    const [followers, setFollowers] = useState<Array<Followee>>([]);
    const [following, setFollowing] = useState<Array<Follower>>([]);
    const [posts, setPosts] = useState<Array<Post>>([]);
    const [songs, setSongs] = useState<Array<Song>>([]);
    const [users, setUsers] = useState<Array<User>>([]);

    useEffect(() => {
        let followersRef = db.collection('followers');
        followersRef.where('id', '!=', "").onSnapshot(querySnapshot => {
            let followersFromDatabase: Array<any> = [];

            querySnapshot.forEach(doc => {
                followersFromDatabase.push(doc.data());
            });
            
            setFollowers(followersFromDatabase);
        });

        let followingRef = db.collection('following');
        followingRef.where('id', '!=', "").onSnapshot(querySnapshot => {
            let followingFromDatabase: Array<any> = [];

            querySnapshot.forEach(doc => {
                followingFromDatabase.push(doc.data());
            });
            
            setFollowing(followingFromDatabase);
        });

        let songsRef = db.collection('songs');
        songsRef.where('id', '!=', "").onSnapshot(querySnapshot => {
            let songsFromDatabase: Array<any> = [];

            querySnapshot.forEach(doc => {
                songsFromDatabase.push(doc.data());
            });
            
            setSongs(songsFromDatabase);
        });

        let postsRef = db.collection('posts');
        postsRef.where('id', '!=', "").onSnapshot(querySnapshot => {
            let postsFromDatabase: Array<any> = [];

            querySnapshot.forEach(doc => {
                postsFromDatabase.push(doc.data());
            });

            postsFromDatabase = postsFromDatabase.filter(post => !post.deleted);

            postsFromDatabase = postsFromDatabase.sort((postA, postB) => {
                if (postA.date < postB.date) {
                    return 1;
                } else if (postA.date > postB.date) {
                    return -1;
                } else {
                    return 0;
                }
            })

            setPosts(postsFromDatabase);
        });

        let usersRef = db.collection('users');
        usersRef.where('id', '!=', "").onSnapshot(querySnapshot => {
            let usersFromDatabase: Array<any> = [];

            querySnapshot.forEach(doc => {
                usersFromDatabase.push(doc.data());
            });
            
            setUsers(usersFromDatabase);
        })
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
