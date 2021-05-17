import React from 'react';
import { useHistory } from 'react-router-dom';

import UserImageView from './UserImageView';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';

import { DEFAULT_PROFILE_PICTURE_URL } from '../../../utility/utility';

import { useCurrentlyVisitedUserProfileUpdate } from '../../../contexts/CurrentlyVisitedUserProfileContext';

interface Props {
    diameter: string;
    isActive: boolean;
}

const UserImagePresenter: React.FC<Props> = ({ diameter, isActive }) => {
    const history = useHistory();
    const loggedInUser = useLoggedInUser();
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

    const userImageClickedHandler = () => {
        updateProfileView();
        history.replace('/profile');
    };

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
