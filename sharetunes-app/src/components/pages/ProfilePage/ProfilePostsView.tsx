import React from 'react';
import classes from './profilePostsView.module.scss';
import PostCardPresenter from '../../common/PostCard/PostCardPresenter';

interface Props {
    posts: any;
}

const ProfilePostsView: React.FC<Props> = ({ posts }) => {
    return (
        <div className={classes.Posts}>
            <h1>Posts after this</h1>
            {/* {console.log(posts)}
            {console.log(posts[0])}
            {console.log(posts[0].caption)} */}
            {posts[0].caption}

            {posts.map((post: any) => {
                <div>
                    <h2>test</h2>
                    <PostCardPresenter postInfo={post} />;
                </div>;
            })}
        </div>
    );
};

export default ProfilePostsView;
