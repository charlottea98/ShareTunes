import React from 'react';
import classes from './profilePostsView.module.scss';
import PostCardPresenter from '../../common/PostCard/PostCardPresenter';

interface Props {
    posts: any;
}

const ProfilePostsView: React.FC<Props> = ({ posts }) => {
    return (
        <div className={classes.Posts}>
            {/* {console.log(posts)}
            {console.log(posts[0])}
            {console.log(posts[0].caption)} */}
            {/* {posts[0].caption} */}

            {posts.map((post: any, idx: any) => (
                <div className={classes.PostCardContainer} key={idx}>
                    <PostCardPresenter postInfo={post} />
                </div>
            ))}
        </div>
    );
};

export default ProfilePostsView;
