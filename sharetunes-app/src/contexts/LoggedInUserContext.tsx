import React, { useState, useContext, createContext, useEffect } from 'react';
import firestore from '../firestore';
import firebase from 'firebase';
import { User } from '../utility/types';

interface SpotifySong {
    title: string;
    artist: string;
    url: string;
}

interface LoggedInUser {
    name: string;
    username: string;
    favoriteSong: SpotifySong;
    email: string;
    profilePicture: string;
}

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
        let snapshot = await firestore
            .collection('users')
            .doc(loggedInUserEmail)
            .get();
        let userInfo = snapshot.data();

        if (snapshot.exists) {
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
        } else {
            console.log('No such user in Firestore database!');
        }
    };

    const updateProfilePicture = async (newProfilePicture: string) => {
        const currentUserRef = firebase
            .firestore()
            .collection('users')
            .doc(loggedInUser?.email);
        currentUserRef
            .update({
                profilePictureURL: newProfilePicture,
            })
            .then(() => {
                console.log('Document successfully updated!');
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error('Error updating document: ', error);
            });
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
