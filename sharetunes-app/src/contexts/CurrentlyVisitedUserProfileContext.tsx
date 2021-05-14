import React, { useState, useContext, createContext } from 'react';

const CurrentlyVisitedUserProfileContext = createContext<string>('');
const CurrentlyVisitedUserProfileUpdateContext = createContext<Function>(
    () => ''
);

const ViewingOwnProfileContext = createContext<boolean>(false);
const ViewingOwnProfileUpdateContext = createContext<Function>(() => '');

export const useCurrentlyVisitedUserProfile = () => {
    return useContext(CurrentlyVisitedUserProfileContext);
};

export const useCurrentlyVisitedUserProfileUpdate = () => {
    return useContext(CurrentlyVisitedUserProfileUpdateContext);
};

export const useViewingOwnProfile = () => {
    return useContext(ViewingOwnProfileContext);
};

export const useViewingOwnProfileUpdate = () => {
    return useContext(ViewingOwnProfileUpdateContext);
};

const CurrentlyVisitedUserProfileProvider: React.FC = ({ children }) => {
    const [
        currentlyVisitedUserProfile,
        setCurrentlyVisitedUserProfile,
    ] = useState<string>('');
    const [viewingOwnProfile, setViewingOwnProfile] = useState<boolean>(true);

    const changeCurrentlyVisitedUserProfile = (
        newCurrentlyVisitedUserEmail: string,
        currentlyLoggedInUserEmail: string
    ) => {
        setViewingOwnProfile(
            currentlyLoggedInUserEmail === newCurrentlyVisitedUserEmail
        );
        setCurrentlyVisitedUserProfile(newCurrentlyVisitedUserEmail);
    };

    const changeViewingOwnProfile = () => {
        setViewingOwnProfile(true);
    };

    return (
        <CurrentlyVisitedUserProfileContext.Provider
            value={currentlyVisitedUserProfile}
        >
            <CurrentlyVisitedUserProfileUpdateContext.Provider
                value={changeCurrentlyVisitedUserProfile}
            >
                <ViewingOwnProfileContext.Provider value={viewingOwnProfile}>
                    <ViewingOwnProfileUpdateContext.Provider
                        value={changeViewingOwnProfile}
                    >
                        {children}
                    </ViewingOwnProfileUpdateContext.Provider>
                </ViewingOwnProfileContext.Provider>
            </CurrentlyVisitedUserProfileUpdateContext.Provider>
        </CurrentlyVisitedUserProfileContext.Provider>
    );
};

export default CurrentlyVisitedUserProfileProvider;
