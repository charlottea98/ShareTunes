import React, { useState, useContext, createContext } from 'react';

import { useLoggedInUser } from './LoggedInUserContext';

const CurrentlyVisitedUserProfileContext = createContext<string>("");
const CurrentlyVisitedUserProfileUpdateContext = createContext<Function>(() => "");

const ViewingOwnProfileContext = createContext<boolean>(false);

export const useCurrentlyVisitedUserProfile = () => {
    return useContext(CurrentlyVisitedUserProfileContext);
};

export const useCurrentlyVisitedUserProfileUpdate = () => {
    return useContext(CurrentlyVisitedUserProfileUpdateContext);
};

export const useViewingOwnProfile = () => {
    return useContext(ViewingOwnProfileContext);
};


const CurrentlyVisitedUserProfileProvider: React.FC = ({ children }) => {
    const [currentlyVisitedUserProfile, setCurrentlyVisitedUserProfile] = useState<string>("");
    const [viewingOwnProfile, setViewingOwnProfile] = useState<boolean>(false);

    const changeCurrentlyVisitedUserProfile = (newCurrentlyVisitedUserEmail: string, currentlyLoggedInUserEmail: string) => {
        setViewingOwnProfile(currentlyLoggedInUserEmail === newCurrentlyVisitedUserEmail);
        setCurrentlyVisitedUserProfile(newCurrentlyVisitedUserEmail);
    };


    return (
        <CurrentlyVisitedUserProfileContext.Provider value={currentlyVisitedUserProfile}>
            <CurrentlyVisitedUserProfileUpdateContext.Provider value={changeCurrentlyVisitedUserProfile}>
                <ViewingOwnProfileContext.Provider value={viewingOwnProfile}>
                    {children}
                </ViewingOwnProfileContext.Provider>
            </CurrentlyVisitedUserProfileUpdateContext.Provider>
        </CurrentlyVisitedUserProfileContext.Provider>
    );
};

export default CurrentlyVisitedUserProfileProvider;
