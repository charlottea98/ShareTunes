import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import UserImageView from './UserImageView';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';

import { DEFAULT_PROFILE_PICTURE_URL } from '../../../utility/utility';

import {
    useViewingOwnProfileUpdate,
    useViewingOwnProfile,
    useCurrentlyVisitedUserProfileUpdate,
} from '../../../contexts/CurrentlyVisitedUserProfileContext';

interface Props {
    diameter: string;
    isActive: boolean;
}

const UserImagePresenter: React.FC<Props> = ({ diameter, isActive }) => {
    const history = useHistory();
    const loggedInUser = useLoggedInUser();
    const viewingSelf = useViewingOwnProfile();

    const viewOwnProfile = useViewingOwnProfileUpdate();
    const updateProfileView = useCurrentlyVisitedUserProfileUpdate();

    let profileURL;

    if (
        loggedInUser &&
        loggedInUser.profilePictureURL !== null &&
        loggedInUser.profilePictureURL !== undefined
    ) {
        profileURL = loggedInUser.profilePictureURL;
    } else {
        profileURL = DEFAULT_PROFILE_PICTURE_URL;
    }

    async function userImageClickedHandler() {
        // let asyncFn = () => {
        //     return new Promise((res) => {
        //         updateProfileView('');
        //         viewOwnProfile(true);
        //         history.replace('/profile');
        //     });
        // };
        // await asyncFn();
        if (viewingSelf === false) {
            window.location.reload();
        }
    }

    return (
        <UserImageView
            diameter={diameter}
            userImageClickedHandler={userImageClickedHandler}
            isActive={isActive}
            profileImage={profileURL}
        />
    );
};

export default UserImagePresenter;
