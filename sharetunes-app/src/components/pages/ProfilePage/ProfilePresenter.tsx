import React, { useEffect, useState } from 'react';
import ProfileView from './ProfileView';
import {
    useLoggedInUser,
    useLoggedInUserUpdate,
} from '../../../contexts/LoggedInUserContext';
import { useHistory } from 'react-router-dom';
import { useDatabase } from '../../../contexts/DatabaseContext';
import {
    useCurrentlyVisitedUserProfile,
    useViewingOwnProfile,
    useViewingOwnProfileUpdate,
} from '../../../contexts/CurrentlyVisitedUserProfileContext';

import ProfilePostsPresenter from './ProfilePostsPresenter';

interface Props {}

const ProfilePresenter: React.FC<Props> = () => {
    const history = useHistory();
    const { users, followers, following, posts } = useDatabase();
    const currentlyVisitedUserProfile = useCurrentlyVisitedUserProfile();
    const loggedInUser = useLoggedInUser();
    const visitedUser = users[currentlyVisitedUserProfile];

    const [viewingOwnProfile, setViewingOwnProfile] = useState(
        useViewingOwnProfile()
    );

    let PostsCount = 0;
    let FollowersCount = 0;
    let FollowingCount = 0;
    let postsIds = users[loggedInUser.email].posts;
    let relevantPosts = [];

    postsIds.forEach((postId) => {
        if (!posts[postId].deleted) {
            relevantPosts.push(posts[postId]);
        }
    });

    if (loggedInUser) {
        PostsCount = users[loggedInUser.email].posts.length;
        FollowersCount = followers[loggedInUser.email].followers.length;
        FollowingCount = following[loggedInUser.email].following.length;
    } else if (!viewingOwnProfile) {
        postsIds = users[visitedUser.email].posts;
        FollowersCount = followers[visitedUser.email].followers.length;
        FollowingCount = following[visitedUser.email].following.length;
    }

    const handleEditProfile = () => {
        history.push('/profile/edit');
    };

    const handleFollow = () => {
        console.log('hello world');
    };

    // TODO: swap to follow button, check if following, write a handle function for visiting view

    useEffect(() => {
        return () => {};
    }, [viewingOwnProfile]);

    return viewingOwnProfile ? (
        <ProfileView
            ownProfile={viewingOwnProfile}
            user={loggedInUser}
            onClickButton={handleEditProfile}
            numberOfposts={PostsCount}
            followers={FollowersCount}
            following={FollowingCount}
            key={new Date().getTime()}
        />
    ) : (
        <ProfileView
            ownProfile={viewingOwnProfile}
            user={visitedUser}
            onClickButton={handleFollow}
            numberOfposts={PostsCount}
            followers={FollowersCount}
            following={FollowingCount}
            key={new Date().getTime()}
        />
    );
};

export default ProfilePresenter;
