import React, { useEffect, useState } from 'react';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';
import { getAllPostsFromUser } from '../../../utility/firestoreCommunication';
import { Post } from '../../../utility/types';


import HomePageView from './HomePageView';

const HomePagePresenter : React.FC = () => {
    const [postsToShow, setPostsToShow] = useState<Array<Post>>([]);
    const loggedInUser = useLoggedInUser();

    useEffect(() => {
        if (loggedInUser) {
            getAllPostsFromUser(loggedInUser.email)
                .then(posts => setPostsToShow(posts));
        }
    }, []);
    

    return <HomePageView postsToShow={postsToShow} />;
}

export default HomePagePresenter;