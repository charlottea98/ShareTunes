import React, { useState, useContext, createContext } from 'react';
import firestore from '../firestore';
import firebase from 'firebase';
import { User } from '../utility/types';
import { getUserInfo } from '../utility/firestoreCommunication';
import { updateUserProfilePicture } from '../utility/firestoreCommunication';

const LoggedInUser = createContext<User | null>(null);
const LoggedInUserUpdateContext = createContext<
    (newLoggedInUser: string) => void
>((x) => console.log(x));
const UpdateProfilePictureContext = createContext<
    (newProfilePicture: string) => void
>((x) => console.log(x));

export const useLoggedInUser = () => {
    return useContext(LoggedInUser);
};

export const useLoggedInUserUpdate = () => {
    return useContext(LoggedInUserUpdateContext);
};

export const useUpdateProfilePicture = () => {
    return useContext(UpdateProfilePictureContext);
};

const LoggedInUserProvider: React.FC = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    const changeLoggedInUser = async (loggedInUserEmail: string) => {
        let userInfo = await getUserInfo(loggedInUserEmail);

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

    const updateProfilePicture = async (newProfilePicture: string) => {
        if (loggedInUser) {
            await updateUserProfilePicture(newProfilePicture, loggedInUser.email);
            changeLoggedInUser(loggedInUser.email);
        }
    };

    return (
        <LoggedInUser.Provider value={loggedInUser}>
            <LoggedInUserUpdateContext.Provider value={changeLoggedInUser}>
                <UpdateProfilePictureContext.Provider
                    value={updateProfilePicture}
                >
                    {children}
                </UpdateProfilePictureContext.Provider>
            </LoggedInUserUpdateContext.Provider>
        </LoggedInUser.Provider>
    );
};

export default LoggedInUserProvider;
