import React from 'react';
import classes from './profileView.module.scss';
import PrimaryButton from '../../common/buttons/PrimaryButton/PrimaryButton';

import { DEFAULT_PROFILE_PICTURE_URL } from '../../../utility/utility';

interface Props {
    user: any;
    onClickEditProfile: any;
    posts: any;
    followers: any;
    following: any;
}

const ProfileView: React.FC<Props> = ({
    user,
    onClickEditProfile,
    posts,
    followers,
    following,
}) => {
    return (
        <header className={classes.ProfileViewHeader}>
            <img
                className={classes.ProfileImg}
                src={
                    user.profilePictureURL
                        ? user.profilePictureURL
                        : DEFAULT_PROFILE_PICTURE_URL
                }
                alt="Profile picture"
            />
            <section className={classes.ProfileInfo}>
                <div className={classes.NameButtonContainer}>
                    <h2 className={classes.Name}>{user.username}</h2>

                    <PrimaryButton
                        text="Edit profile"
                        onButtonClick={onClickEditProfile}
                        buttonColor="editProfileBtn"
                    />
                </div>
                <ul className={classes.List}>
                    <li>{posts} posts</li>
                    <li>{followers} followers</li>
                    <li>{following} following</li>
                </ul>

                <div className={classes.Song}>
                    <p>{user.favoriteSong}</p>
                </div>

                <div className={classes.About}>
                    <h1>{user.name}</h1>
                    <br />

                    <p>{user.biography}</p>
                </div>
            </section>
        </header>
    );
};

export default ProfileView;
