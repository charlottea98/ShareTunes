import React, { useEffect, useState } from 'react';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';
import { getAllRelevantPosts } from '../../../utility/firestoreCommunication';
import { Post } from '../../../utility/types';
import { deletePost as deletePostFromFirestore } from '../../../utility/firestoreCommunication';

import HomePageView from './HomePageView';

const HomePagePresenter : React.FC = () => {
    const [postsToShow, setPostsToShow] = useState<Array<Post>>([]);
    const loggedInUser = useLoggedInUser();

    const deletePost = (postId: string) => {
        deletePostFromFirestore(parseInt(postId));

        if (loggedInUser) {
            getAllRelevantPosts(loggedInUser.email, "home page")
                .then(posts => setPostsToShow(posts));
        }
    }

    useEffect(() => {
        if (loggedInUser) {
            getAllRelevantPosts(loggedInUser.email, "home page")
                .then(posts => setPostsToShow(posts));
        }
    }, []);
    

    return <HomePageView postsToShow={postsToShow} deletePost={deletePost} />;
}

export default HomePagePresenter;