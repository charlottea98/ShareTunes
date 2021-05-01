import React, { useState, useContext, createContext } from 'react';
import firestore from '../firestore';

interface SpotifySong {
    title: string,
    artist: string,
    url: string
}

interface LoggedInUser {
    name: string,
    username: string,
    favoriteSong: SpotifySong,
    email: string,
    profilePicture: string
}

interface Props {
    children: React.ReactNode
}

const LoggedInUser = createContext<LoggedInUser | null>(null);
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
    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
    
    const changeLoggedInUser = (loggedInUserEmail : string) => {
        let docRef = firestore.collection('users').doc(loggedInUserEmail);
        
        docRef.get().then(doc => {
            if (doc.exists) {
                let userInfo = doc.data();
                setLoggedInUser({
                    name: `${userInfo?.firstName} ${userInfo?.lastName}`,
                    username:`${userInfo?.userName}`,
                    email: loggedInUserEmail,
                    favoriteSong: {
                        title: 'Midnight City',
                        artist: 'M83',
                        url: 'https://open.spotify.com/track/6GyFP1nfCDB8lbD2bG0Hq9?si=fNUnqyC7Sm2tIS9qhwtORQ'
                    },
                    profilePicture: `${userInfo?.profilePicture}`
                });
            } else {
                console.log("No such user in Firestore database!");
            }
        }).catch((error) => {
            console.log("Error getting info from Firestore:", error);
        });
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