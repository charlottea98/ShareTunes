import React from 'react';
import { Post } from '../../../utility/types';
import classes from './homePage.module.scss';

import PostCard from '../../common/PostCard/PostCardPresenter';

interface Props {
    postsToShow: Array<Post>
}

const HomePageView : React.FC<Props> = ({postsToShow}) => {
    return (
        <div className={classes.HomePage}>        
            {
                postsToShow.map((post, idx) => (
                    <div className={classes.postCardContainer} key = {idx}>
                        <PostCard
                            postInfo = {post}
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default HomePageView;