import React from 'react';

import PostCardHomeView from './PostCardHomeView';
import PostCardDiscoverView from './PostCardDiscoveryView';

interface Props {
    pageToViewOn: "home page" | "discovery page"
}

const PostCardPresenter : React.FC<Props> = ({pageToViewOn}) => {
    let postCardView;

    if (pageToViewOn === 'home page') {
        postCardView = <PostCardHomeView />;
    } else { // pageToViewOn === 'discovery page'
        postCardView = <PostCardDiscoverView />;
    }

    return postCardView;
}

export default PostCardPresenter;