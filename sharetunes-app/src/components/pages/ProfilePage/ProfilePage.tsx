import React, { useEffect } from 'react';
import UserProfile from '../../UserProfile/UserProfile';
import classes from './profilePage.module.scss';
import fire from '../../../fire';
import LogoutButton from '../../common/buttons/LogoutButton/LogoutButton';

interface Props {
    userObj: Object;
}

const ProfilePage: React.FC<Props> = ({ userObj }) => {
    useEffect(() => {});

    return (
        <div className={classes.ProfilePage}>
            <UserProfile />
           <LogoutButton></LogoutButton>
        </div>
    );
};

export default ProfilePage;
