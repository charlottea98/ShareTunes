import React from 'react';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';
import { Post } from '../../../utility/types';

import HomePageView from './HomePageView';

const HomePagePresenter : React.FC = () => {
    const loggedInUser = useLoggedInUser();
    
    let postsToShow : Array<Post> = [];

    return <HomePageView postsToShow={postsToShow} />;
}

export default HomePagePresenter;