import React, { useEffect } from 'react';
import UserProfile from '../../UserProfile/UserProfile';
import classes from './profilePage.module.scss';

interface Props {
    userObj: Object;
}

const ProfilePage: React.FC<Props> = ({ userObj }) => {
    useEffect(() => {});

    return (
        <div className={classes.ProfilePage}>
            <UserProfile />
        </div>
    );
};

export default ProfilePage;
