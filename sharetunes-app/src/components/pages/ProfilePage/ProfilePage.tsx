import React, { useEffect } from 'react';
import UserProfile from '../../UserProfile/UserProfile';
import classes from './profilePage.module.scss';
import fire from '../../../fire';
import LogoutButton from '../../common/buttons/LogoutButton/LogoutButton';
import ProfileView from '../../UserProfile/views/ProfileView';

interface Props {
    userObj: Object;
}

const ProfilePage: React.FC<Props> = ({ userObj }) => {
    useEffect(() => {});

    return (
        <div></div>
        // <div className={classes.ProfilePage}>
        //     <ProfileView imgSource="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.ivHy7rpHL0GyEA_mdcY5AAHaFj%26pid%3DApi&f=1" />
        //     <LogoutButton></LogoutButton>
        // </div>
    );
};

export default ProfilePage;
