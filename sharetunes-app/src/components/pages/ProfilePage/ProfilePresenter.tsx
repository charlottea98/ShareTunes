import React, { useEffect, useState } from 'react';
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
import { useCurrentAudio } from '../../../contexts/AudioContext';

interface Props {}

const ProfilePresenter: React.FC<Props> = () => {
    const history = useHistory();
    const { users, followers, following, posts } = useDatabase();
    const currentlyVisitedUserProfile = useCurrentlyVisitedUserProfile();
    const loggedInUser = useLoggedInUser();
    const visitedUser = users[currentlyVisitedUserProfile];
    const viewingOwnProfile = useViewingOwnProfile();
    const [numberOfPosts, setNumberOfPosts] = useState<number>(0);
    const [numberOfFollwers, setNumberOfFollowers] = useState<number>(0);
    const [numberOfFollwing, setNumberOfFollowing] = useState<number>(0);

    let session = sessionStorage.getItem('user-session');

    const currentAudio = useCurrentAudio();

    useEffect(() => {
        currentAudio?.pause();
    }, [])

    useEffect(() => {
        if (visitedUser) {
            let postsIds = visitedUser.posts;
            let relevantPosts = [];

            let numberOfAllPosts = Object.keys(posts).length;
            
            if (numberOfAllPosts > 0) {
                postsIds.forEach(postId => {
                    if (!posts[postId].deleted) {
                        relevantPosts.push(posts[postId]);
                    }
                })
    
                setNumberOfPosts(relevantPosts.length);
            }
        } else if (loggedInUser) {
            let postsIds = loggedInUser.posts;
            let relevantPosts = [];

            let numberOfAllPosts = Object.keys(posts).length;
            
            if (numberOfAllPosts > 0) {
                postsIds.forEach(postId => {
                    if (!posts[postId].deleted) {
                        relevantPosts.push(posts[postId]);
                    }
                })
    
                setNumberOfPosts(relevantPosts.length);
            }
        }
    }, [posts, loggedInUser]);

    useEffect(() => {
        if (visitedUser) {
            setNumberOfFollowers(followers[visitedUser.email].followers.length);
        } else if (loggedInUser) {
            setNumberOfFollowers(followers[loggedInUser.email].followers.length);
        }
    }, [followers, loggedInUser]);

    useEffect(() => {
        if (visitedUser) {
            setNumberOfFollowing(following[visitedUser.email].following.length);
        } else if (loggedInUser) {
            setNumberOfFollowing(following[loggedInUser.email].following.length);
        }
    }, [following, loggedInUser]);

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
                numberOfposts={numberOfPosts}
                followers={numberOfFollwers}
                following={numberOfFollwing}
                key={new Date().getTime()}
                isFollowing={isFollowing}
            />
        ) : (
            <ProfileView
                ownProfile={viewingOwnProfile}
                user={visitedUser}
                onClickButton={handleFollow}
                numberOfposts={numberOfPosts}
                followers={numberOfFollwers}
                following={numberOfFollwing}
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
