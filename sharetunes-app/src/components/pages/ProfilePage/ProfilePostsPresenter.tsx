import React, { useEffect, useState } from 'react';
import ProfilePostsView from './ProfilePostsView';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';
import { useDatabase } from '../../../contexts/DatabaseContext';
import { Post } from '../../../utility/types';

interface Props {}

const ProfilePostsPresenter: React.FC<Props> = () => {
    const loggedInUser = useLoggedInUser();
    const { posts } = useDatabase();
    const [postsToShow, setPostsToShow] = useState<Array<Post>>([]);

    useEffect(() => {
        if (loggedInUser) {
            let numberOfPosts = Object.keys(posts).length;
            
            if (numberOfPosts > 0) {
                let postsToShowTemp = loggedInUser.posts.map((postId: string) => posts[postId]);
                postsToShowTemp = postsToShowTemp.filter((post: Post) => !post.deleted);
    
                setPostsToShow(postsToShowTemp);
            }
        }
    }, [posts]);

    return <ProfilePostsView posts={postsToShow} />;
};

export default ProfilePostsPresenter;
