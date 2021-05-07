import React from 'react';
import ProfileView from './ProfileView';
import {
    useLoggedInUser,
    useLoggedInUserUpdate,
} from '../../../contexts/LoggedInUserContext';
import { useHistory } from 'react-router-dom';
import { useCurrentlyVisitedUserProfile } from '../../../contexts/CurrentlyVisitedUserProfileContext';

interface Props {}

const ProfilePresenter: React.FC<Props> = () => {
    const history = useHistory();
    const user = useLoggedInUser();
    const setUser = useLoggedInUserUpdate();

    const handleEditProfile = () => {
        history.push('/profile/edit');
    };


    return <ProfileView user={user} onClickEditProfile={handleEditProfile} />;
};

export default ProfilePresenter;
