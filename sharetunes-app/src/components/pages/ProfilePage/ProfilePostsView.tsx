import React from 'react';
import classes from './profilePostsView.module.scss';

interface Props {
    user: any;
}

const ProfilePostsView: React.FC<Props> = ({ user }) => {
    return <div className={classes.Posts}>{user.posts}</div>;
};

export default ProfilePostsView;
