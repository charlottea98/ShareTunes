import React, { useState, useContext, createContext } from 'react';

const CurrentlyVisitedUserProfileContext = createContext<string>("");
const CurrentlyVisitedUserProfileUpdateContext = createContext<
    (newLoggedInUser: string) => void
>((x) => console.log(x));


export const useCurrentlyVisitedUserProfile = () => {
    return useContext(CurrentlyVisitedUserProfileContext);
};

export const useCurrentlyVisitedUserProfileUpdate = () => {
    return useContext(CurrentlyVisitedUserProfileUpdateContext);
};


const LoggedInUserProvider: React.FC = ({ children }) => {
    const [currentlyVisitedUserProfile, setCurrentlyVisitedUserProfile] = useState<string>("");

    const changeCurrentlyVisitedUserProfile = (newCurrentlyVisitedUserEmail: string) => {
        setCurrentlyVisitedUserProfile(newCurrentlyVisitedUserEmail);
    };


    return (
        <CurrentlyVisitedUserProfileContext.Provider value={currentlyVisitedUserProfile}>
            <CurrentlyVisitedUserProfileUpdateContext.Provider value={changeCurrentlyVisitedUserProfile}>
                {children}
            </CurrentlyVisitedUserProfileUpdateContext.Provider>
        </CurrentlyVisitedUserProfileContext.Provider>
    );
};

export default LoggedInUserProvider;
