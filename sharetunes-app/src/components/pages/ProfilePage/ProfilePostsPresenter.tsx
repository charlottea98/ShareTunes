import React, { useEffect, useState } from 'react';
import ProfilePostsView from './ProfilePostsView';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';
import { useDatabase } from '../../../contexts/DatabaseContext';
import { Post } from '../../../utility/types';
import { useCurrentlyVisitedUserProfile } from '../../../contexts/CurrentlyVisitedUserProfileContext';

interface Props {}

const ProfilePostsPresenter: React.FC<Props> = () => {
    const viewingProfileEmail = useCurrentlyVisitedUserProfile();
    const loggedInUser = useLoggedInUser();
    const { posts, users } = useDatabase();
    const [postsToShow, setPostsToShow] = useState<Array<Post>>([]);

    useEffect(() => {
        if (viewingProfileEmail) {
            let visitedProfile = users[viewingProfileEmail];
            let numberOfPosts = Object.keys(posts).length;

            if (numberOfPosts > 0) {
                let postsToShowTemp = visitedProfile.posts.map((postId: string) => posts[postId]);
                postsToShowTemp = postsToShowTemp.filter((post: Post) => !post.deleted);
    
                setPostsToShow(postsToShowTemp);
            }
        } else if (loggedInUser) {
            let numberOfPosts = Object.keys(posts).length;

            if (numberOfPosts > 0) {
                let postsToShowTemp = loggedInUser.posts.map((postId: string) => posts[postId]);
                postsToShowTemp = postsToShowTemp.filter((post: Post) => !post.deleted);
    
                setPostsToShow(postsToShowTemp);
            }
        }
    }, [posts, viewingProfileEmail]);

    return <ProfilePostsView posts={postsToShow} />;
};

export default ProfilePostsPresenter;
