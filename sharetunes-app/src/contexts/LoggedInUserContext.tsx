import React, { useState, useContext, createContext, useEffect } from 'react';
import { User } from '../utility/types';
import { useDatabase } from './DatabaseContext';

const LoggedInUser = createContext<User | null>(null);
const LoggedInUserUpdateContext = createContext<
    (newLoggedInUser: string) => void
>(() => null);


export const useLoggedInUser = () => {
    return useContext(LoggedInUser);
};

export const useLoggedInUserUpdate = () => {
    return useContext(LoggedInUserUpdateContext);
};

const LoggedInUserProvider: React.FC = ({ children }) => {
    const { users } = useDatabase()

    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [loggedInUserEmail, setLoggedInUserEmail] = useState<string>("null");

    const changeLoggedInUser = async (newLoggedInUserEmail: string) => {
        setLoggedInUserEmail(newLoggedInUserEmail)

        let userInfo = users[newLoggedInUserEmail];

        if (userInfo) {
            let user: User = {
                id: userInfo.id,
                name: userInfo.name,
                email: userInfo.email,
                username: userInfo.username,
                profilePictureURL: userInfo.profilePictureURL,
                favoriteSong: userInfo.favoriteSong,
                biography: userInfo.biography,
                posts: userInfo.posts,
            };
    
            setLoggedInUser(user);
        }

    };

    useEffect(() => {
        let userInfo = users[loggedInUserEmail];

        if (userInfo) {
            let user: User = {
                id: userInfo.id,
                name: userInfo.name,
                email: userInfo.email,
                username: userInfo.username,
                profilePictureURL: userInfo.profilePictureURL,
                favoriteSong: userInfo.favoriteSong,
                biography: userInfo.biography,
                posts: userInfo.posts,
            };
    
            setLoggedInUser(user);
        }
    }, [users]);

    return (
        <LoggedInUser.Provider value={loggedInUser}>
            <LoggedInUserUpdateContext.Provider value={changeLoggedInUser}>
                {children}
            </LoggedInUserUpdateContext.Provider>
        </LoggedInUser.Provider>
    );
};

export default LoggedInUserProvider;
