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
    const viewingOwnProfile = useViewingOwnProfile();

    let PostsCount = 0;
    let FollowersCount = 0;
    let FollowingCount = 0;
    let postsIds: any;
    let relevantPosts = [];

    const handlePostsIds = () => {
        postsIds.forEach((postId: any) => {
            if (!posts[postId].deleted) {
                relevantPosts.push(posts[postId]);
            }
        });
    };

    if (loggedInUser) {
        postsIds = users[loggedInUser.email].posts;
        PostsCount = users[loggedInUser.email].posts.length;
        FollowersCount = followers[loggedInUser.email].followers.length;
        FollowingCount = following[loggedInUser.email].following.length;
        handlePostsIds();
    } else if (!viewingOwnProfile) {
        postsIds = users[visitedUser.email].posts;
        FollowersCount = followers[visitedUser.email].followers.length;
        FollowingCount = following[visitedUser.email].following.length;
        handlePostsIds();
    }

    const handleEditProfile = () => {
        history.push('/profile/edit');
    };

    const handleFollow = () => {
        console.log('hello world');
    };

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
