import React from 'react';
import ProfileView from './ProfileView';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';
import { useHistory } from 'react-router-dom';
import { useDatabase } from '../../../contexts/DatabaseContext';
import {
    useCurrentlyVisitedUserProfile,
    useViewingOwnProfile,
} from '../../../contexts/CurrentlyVisitedUserProfileContext';

import profileNoData from './ProfileNoData';
import { DatabaseHandler } from '../../../utility/databaseHandler';

interface Props {}

const ProfilePresenter: React.FC<Props> = () => {
    const history = useHistory();
    const { users, followers, following, posts } = useDatabase();
    const currentlyVisitedUserProfile = useCurrentlyVisitedUserProfile();
    const loggedInUser = useLoggedInUser();
    const visitedUser = users[currentlyVisitedUserProfile];
    const viewingOwnProfile = useViewingOwnProfile();

    let session = sessionStorage.getItem('user-session');
    let PostsCount = 0;
    let FollowersCount = 0;
    let FollowingCount = 0;
    let postsIds: any;

    if (viewingOwnProfile && loggedInUser) {
        postsIds = users[loggedInUser.email].posts;
        PostsCount = users[loggedInUser.email].posts.length;
        FollowersCount = followers[loggedInUser.email].followers.length;
        FollowingCount = following[loggedInUser.email].following.length;
    } else if (!viewingOwnProfile) {
        postsIds = users[visitedUser.email].posts;
        FollowersCount = followers[visitedUser.email].followers.length;
        FollowingCount = following[visitedUser.email].following.length;
    }

    const isFollowing = () => {
        if (loggedInUser) {
            if (
                following[loggedInUser.email].following.includes(
                    visitedUser.email
                )
            ) {
                return true;
            }
        }
        return false;
    };

    const handleEditProfile = () => {
        history.push('/profile/edit');
    };

    const handleFollow = () => {
        if (!isFollowing()) {
            DatabaseHandler.addNewFollower(
                loggedInUser?.email,
                visitedUser.email
            );
        } else {
            DatabaseHandler.deleteFollower(
                loggedInUser?.email,
                visitedUser.email
            );
        }
    };

    return (
        profileNoData(loggedInUser, session) ||
        (viewingOwnProfile ? (
            <ProfileView
                ownProfile={viewingOwnProfile}
                user={loggedInUser}
                onClickButton={handleEditProfile}
                numberOfposts={PostsCount}
                followers={FollowersCount}
                following={FollowingCount}
                key={new Date().getTime()}
                isFollowing={isFollowing}
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
                isFollowing={isFollowing}
            />
        ))
    );

    // return viewingOwnProfile ? (
    //     <ProfileView
    //         ownProfile={viewingOwnProfile}
    //         user={loggedInUser}
    //         onClickButton={handleEditProfile}
    //         numberOfposts={PostsCount}
    //         followers={FollowersCount}
    //         following={FollowingCount}
    //         key={new Date().getTime()}
    //     />
    // ) : (
    //     <ProfileView
    //         ownProfile={viewingOwnProfile}
    //         user={visitedUser}
    //         onClickButton={handleFollow}
    //         numberOfposts={PostsCount}
    //         followers={FollowersCount}
    //         following={FollowingCount}
    //         key={new Date().getTime()}
    //     />
    // );
};

export default ProfilePresenter;
