import React, { useState, useContext, createContext } from 'react';

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
    const [followers, setFollowers] = useState<Array<Followee>>([]);
    const [following, setFollowing] = useState<Array<Follower>>([]);
    const [posts, setPosts] = useState<Array<Post>>([]);
    const [songs, setSongs] = useState<Array<Song>>([]);
    const [users, setUsers] = useState<Array<User>>([]);

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
