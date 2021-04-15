import React, { useState, useContext, createContext } from 'react';

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
const LoggedInUserUpdateContext = createContext<(newLoggedInUser : LoggedInUser) => void>(x => console.log(x));

export const useLoggedInUser = () => {
    return useContext(LoggedInUser);
}

export const useLoggedInUserUpdate = () => {
    return useContext(LoggedInUserUpdateContext);
}


const LoggedInUserProvider : React.FC<Props> = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);

    const changeLoggedInUser = (newLoggedInUser : LoggedInUser) => {
        setLoggedInUser(newLoggedInUser);
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