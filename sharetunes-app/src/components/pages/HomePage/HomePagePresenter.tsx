import React from 'react';

import HomePageView from './HomePageView';
import { useDatabase } from '../../../contexts/DatabaseContext';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';
import { Post } from '../../../utility/types';

const HomePagePresenter : React.FC = () => {
    const { posts, following } = useDatabase();
    const loggedInUser = useLoggedInUser();

    let postsToShow: Array<Post> = [];

    if (loggedInUser) {
        let userIsFollowing = following.filter(followingObject => (followingObject.id === loggedInUser.email))[0].following;
        
        userIsFollowing = [...userIsFollowing, loggedInUser.email];
        postsToShow = posts.filter(post => userIsFollowing.includes(post.emailOfPublisher));
        postsToShow = posts.sort((postA, postB) => {
            if (postA.date < postB.date) {
                return 1;
            } else if (postA.date > postB.date) {
                return -1;
            } else {
                return 0;
            }
        })
    }

    return <HomePageView postsToShow={postsToShow} />;
}

export default HomePagePresenter;