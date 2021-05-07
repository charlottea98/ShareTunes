import React, { useState, useContext, createContext } from 'react';
import { User } from '../utility/types';
import { useDatabase } from './DatabaseContext';

const LoggedInUser = createContext<User | null>(null);
const LoggedInUserUpdateContext = createContext<
    (newLoggedInUser: string) => void
>((x) => console.log(x));


export const useLoggedInUser = () => {
    return useContext(LoggedInUser);
};

export const useLoggedInUserUpdate = () => {
    return useContext(LoggedInUserUpdateContext);
};

const LoggedInUserProvider: React.FC = ({ children }) => {
    const { users } = useDatabase()

    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    const changeLoggedInUser = async (loggedInUserEmail: string) => {
        let userInfo = users.filter(user => user.email === loggedInUserEmail)[0];

        let user: User = {
            id: userInfo?.id,
            name: userInfo?.name,
            email: userInfo?.email,
            username: userInfo?.username,
            profilePictureURL: userInfo?.profilePictureURL,
            favoriteSong: userInfo?.favoriteSong,
            biography: userInfo?.biography,
            posts: userInfo?.posts,
        };

        setLoggedInUser(user);
    };

    return (
        <LoggedInUser.Provider value={loggedInUser}>
            <LoggedInUserUpdateContext.Provider value={changeLoggedInUser}>
                {children}
            </LoggedInUserUpdateContext.Provider>
        </LoggedInUser.Provider>
    );
};

export default LoggedInUserProvider;
