import React, { useEffect } from 'react';
import UserProfile from '../../UserProfile/UserProfile';
import classes from './profilePage.module.scss';

const ProfilePage: React.FC = () => {
    useEffect(() => {});

    return (
        <div className={classes.ProfilePage}>
            <UserProfile />
        </div>
    );
};

export default ProfilePage;
