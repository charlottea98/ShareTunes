import React, { useState, useContext, createContext } from 'react';
import firestore from '../firestore';
import { User } from '../utility/types';

interface SpotifySong {
    title: string,
    artist: string,
    url: string
}

interface Props {
    children: React.ReactNode
}

const LoggedInUser = createContext<User | null>(null);
const LoggedInUserUpdateContext = createContext<(newLoggedInUser : string) => void>(x => console.log(x));
const UpdateProfilePictureContext = createContext<(newLoggedInUser : string) => void>(x => console.log(x));


export const useLoggedInUser = () => {
    return useContext(LoggedInUser);
}

export const useLoggedInUserUpdate = () => {
    return useContext(LoggedInUserUpdateContext);
}

export const useUpdateProfilePicture = () => {
    return useContext(UpdateProfilePictureContext);
}

const LoggedInUserProvider : React.FC<Props> = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    
    const changeLoggedInUser = async (loggedInUserEmail : string) => {
        let snapshot = await firestore.collection('users').doc(loggedInUserEmail).get();
        let userInfo = snapshot.data();

        if (snapshot.exists) {
            let user : User = {
                id: userInfo?.id,
                name: userInfo?.name,
                email: userInfo?.email,
                username: userInfo?.username,
                profilePictureURL: userInfo?.profilePictureURL,
                favoriteSong: userInfo?.favoriteSong,
                biography: userInfo?.biography,
                posts: userInfo?.posts
            };

            setLoggedInUser(user);
        } else {
            console.log("No such user in Firestore database!");
        }
    }

    const updateProfilePicture = (newProfilePicture: string) => {
        // 1. Update string in Firebase
        // 2. Fetch user data from firebase
        // 3. 
    }

    return (
        <LoggedInUser.Provider value={loggedInUser}>
            <LoggedInUserUpdateContext.Provider value={changeLoggedInUser}>
                <UpdateProfilePictureContext.Provider value={updateProfilePicture}>
                    {children}
                </UpdateProfilePictureContext.Provider>
            </LoggedInUserUpdateContext.Provider>
        </LoggedInUser.Provider>
    )
}

export default LoggedInUserProvider;