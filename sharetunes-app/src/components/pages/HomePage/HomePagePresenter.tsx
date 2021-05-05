import React, { useEffect, useState } from 'react';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';
import { getAllRelevantPosts } from '../../../utility/firestoreCommunication';
import { Post } from '../../../utility/types';


import HomePageView from './HomePageView';

const HomePagePresenter : React.FC = () => {
    const [postsToShow, setPostsToShow] = useState<Array<Post>>([]);
    const loggedInUser = useLoggedInUser();

    useEffect(() => {
        if (loggedInUser) {
            getAllRelevantPosts(loggedInUser.email, "home page")
                .then(posts => setPostsToShow(posts));
        }
    }, []);
    

    return <HomePageView postsToShow={postsToShow} />;
}

export default HomePagePresenter;