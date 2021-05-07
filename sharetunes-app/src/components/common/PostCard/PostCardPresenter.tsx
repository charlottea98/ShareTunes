import React, {  useState } from 'react';

import PostCardView from './PostCardView';
import PostCardDiscoverView from './PostCardDiscoveryView';
import { Post } from '../../../utility/types';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';


interface Props {
    postInfo: Post,
    pageToViewOn: "home page" | "discovery page"
}

const PostCardPresenter : React.FC<Props> = ({pageToViewOn, postInfo}) => {
    const [viewPost, setViewPost] = useState<boolean>(false);

    let postCardView;

    const changeViewPost = () => {
        setViewPost(!viewPost);
    }

    const loggedInUser = useLoggedInUser();

    let userCanDeleteThisPost = false;

    if (loggedInUser && loggedInUser.username == postInfo?.usernameOfPublisher) {
        userCanDeleteThisPost = true;
    }

    if (pageToViewOn === 'home page') {
        postCardView = (
            <PostCardView 
                postCardInfo = {postInfo} 
                userCanDeletePost = {userCanDeleteThisPost}
            />
        );
    } else { // pageToViewOn === 'discovery page'
        postCardView = <PostCardDiscoverView postCardInfo={postInfo} 
            changeViewPost={changeViewPost}
            viewPost={viewPost}
        />;
    }

    return postCardView;
}

export default PostCardPresenter;