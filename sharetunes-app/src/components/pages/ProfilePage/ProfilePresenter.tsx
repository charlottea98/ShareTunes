import React from 'react';
import ProfileView from './ProfileView';
import {
    useLoggedInUser,
    useLoggedInUserUpdate,
} from '../../../contexts/LoggedInUserContext';
import { useHistory } from 'react-router-dom';
import { useDatabase } from '../../../contexts/DatabaseContext';
import { useCurrentlyVisitedUserProfile } from '../../../contexts/CurrentlyVisitedUserProfileContext';

interface Props {}

const ProfilePresenter: React.FC<Props> = () => {
    const history = useHistory();
    const loggedInUser = useLoggedInUser();
    const setUser = useLoggedInUserUpdate();
    const currentlyVisitedUserProfile = useCurrentlyVisitedUserProfile();
    const { users, followers, following } = useDatabase();


    let numberOfPosts = 0;
    let numberOfFollowers = 0;
    let numberOfFollowing = 0;

    if (loggedInUser) {
        numberOfPosts = users[loggedInUser.email].posts.length;
        numberOfFollowers = followers[loggedInUser.email].followers.length;
        numberOfFollowing = followers[loggedInUser.email].followers.length;
    }

    const handleEditProfile = () => {
        history.push('/profile/edit');
    };

    return (
        <ProfileView
            user={loggedInUser}
            onClickEditProfile={handleEditProfile}
            numberOfposts={numberOfPosts}
            followers={numberOfFollowers}
            following={numberOfFollowing}
        />
    );
};

export default ProfilePresenter;
