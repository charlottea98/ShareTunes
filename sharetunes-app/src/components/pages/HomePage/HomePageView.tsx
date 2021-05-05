import React from 'react';
import { Post } from '../../../utility/types';
import classes from './homePage.module.scss';

import PostCard from '../../common/PostCard/PostCardPresenter';

interface Props {
    postsToShow: Array<Post>
}

const HomePageView : React.FC<Props> = ({postsToShow}) => {
    console.log(postsToShow);
    
    return (
        <div className={classes.HomePage}>
            {
                postsToShow.map(post => (
                    <div className={classes.postCardContainer}>
                        <PostCard
                            key = {post.id}
                            postInfo = {post}
                            pageToViewOn="home page"
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default HomePageView;