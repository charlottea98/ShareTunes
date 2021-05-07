import React, { useEffect, useState } from 'react';

import HomePageView from './HomePageView';
import { useDatabase } from '../../../contexts/DatabaseContext';

const HomePagePresenter : React.FC = () => {
    const { posts } = useDatabase();

    return <HomePageView postsToShow={posts} />;
}

export default HomePagePresenter;