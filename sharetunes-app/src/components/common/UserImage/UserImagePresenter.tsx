import React from 'react';
import { useHistory } from "react-router-dom";

import UserImageView from './UserImageView';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';

import { DEFAULT_PROFILE_PICTURE_URL } from '../../../utility/utility';

interface Props {
    diameter: string,
    isActive: boolean
}

const UserImagePresenter : React.FC<Props> = ({diameter, isActive}) => {
    const history = useHistory();
    const loggedInUser = useLoggedInUser();

    let profileImage;

    if (loggedInUser && loggedInUser.profilePictureURL !== "") {
        profileImage = loggedInUser.profilePictureURL;
    } else {
        profileImage = DEFAULT_PROFILE_PICTURE_URL;
    }

    const userImageClickedHandler = () => {
        history.replace('/profile');
    }

    return <UserImageView 
        diameter = {diameter}
        userImageClickedHandler={userImageClickedHandler}
        isActive = {isActive}
        profileImage = {profileImage}
    />;
}

export default UserImagePresenter;