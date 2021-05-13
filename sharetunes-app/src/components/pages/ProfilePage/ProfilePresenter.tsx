import React from 'react';
import ProfileView from './ProfileView';
import {
    useLoggedInUser,
    useLoggedInUserUpdate,
} from '../../../contexts/LoggedInUserContext';
import { useHistory } from 'react-router-dom';
import { useDatabase } from '../../../contexts/DatabaseContext';
import { useCurrentlyVisitedUserProfile } from '../../../contexts/CurrentlyVisitedUserProfileContext';

import ProfilePostsPresenter from './ProfilePostsPresenter';

interface Props {}

const ProfilePresenter: React.FC<Props> = () => {
    const history = useHistory();
    const loggedInUser = useLoggedInUser();
    const { users, followers, posts } = useDatabase();

    let numberOfPosts = 0;
    let numberOfFollowers = 0;
    let numberOfFollowing = 0;

    if (loggedInUser) {
        let postsIds = users[loggedInUser.email].posts;
        let relevantPosts = [];

        postsIds.forEach(postId => {
            if (!posts[postId].deleted) {
                relevantPosts.push(posts[postId]);
            }
        })

        numberOfPosts = relevantPosts.length;
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
