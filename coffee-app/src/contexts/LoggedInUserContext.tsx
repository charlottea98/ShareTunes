import React, { useState, useContext, createContext } from 'react';
import firestore from '../firestore';
// import firebase from 'firebase';

interface SpotifySong {
    title: string,
    artist: string,
    url: string
}

interface LoggedInUser {
    name: string,
    favoriteSong: SpotifySong,
    email: string
}

interface Props {
    children: React.ReactNode
}

const LoggedInUser = createContext<LoggedInUser | null>(null);
const LoggedInUserUpdateContext = createContext<(newLoggedInUser : string) => void>(x => console.log(x));

export const useLoggedInUser = () => {
    return useContext(LoggedInUser);
}

export const useLoggedInUserUpdate = () => {
    return useContext(LoggedInUserUpdateContext);
}

const LoggedInUserProvider : React.FC<Props> = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
    
    const changeLoggedInUser = (loggedInUserEmail : string) => {
        let docRef = firestore.collection('users').doc(loggedInUserEmail);
        
        docRef.get().then(doc => {
            if (doc.exists) {
                let userInfo = doc.data();
                setLoggedInUser({
                    name: `${userInfo?.first_name} ${userInfo?.last_name}`,
                    email: loggedInUserEmail,
                    favoriteSong: {
                        title: 'Midnight City',
                        artist: 'M83',
                        url: 'https://open.spotify.com/track/6GyFP1nfCDB8lbD2bG0Hq9?si=fNUnqyC7Sm2tIS9qhwtORQ'
                    }
                });
            } else {
                console.log("No such user in Firestore database!");
            }
        }).catch((error) => {
            console.log("Error getting info from Firestore:", error);
        });

        // setLoggedInUser({});
    }

    return (
        <LoggedInUser.Provider value={loggedInUser}>
            <LoggedInUserUpdateContext.Provider value={changeLoggedInUser}>
                {children}
            </LoggedInUserUpdateContext.Provider>
        </LoggedInUser.Provider>
    )
}

export default LoggedInUserProvider;