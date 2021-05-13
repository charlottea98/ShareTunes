import React from 'react';
import classes from './profilePostsView.module.scss';
import PostCardPresenter from '../../common/PostCard/PostCardPresenter';

interface Props {
    posts: any;
}

const ProfilePostsView: React.FC<Props> = ({ posts }) => {
    return (
        <div className={classes.Posts}>
            {posts.map((post: any, idx: any) => (
                <PostCardPresenter postInfo={post} key={idx} />
            ))}
        </div>
    );
};

export default ProfilePostsView;
