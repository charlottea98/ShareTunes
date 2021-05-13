import React from 'react';
import classes from './profileView.module.scss';
import PrimaryButton from '../../common/buttons/PrimaryButton/PrimaryButton';

import { DEFAULT_PROFILE_PICTURE_URL } from '../../../utility/utility';

interface Props {
    ownProfile: boolean;
    user: any;
    onClickButton: any;
    numberOfposts: any;
    followers: number;
    following: number;
}

const ProfileView: React.FC<Props> = ({
    ownProfile,
    user,
    onClickButton,
    numberOfposts,
    followers,
    following,
}) => {
    return (
        <header className={classes.ProfileViewHeader}>
            <img
                className={classes.ProfileImg}
                src={
                    user?.profilePictureURL
                        ? user.profilePictureURL
                        : DEFAULT_PROFILE_PICTURE_URL
                }
                alt="Profile picture"
            />

            <section className={classes.ProfileInfo}>
                <div className={classes.NameButtonContainer}>
                    <h2 className={classes.Name}>{user?.username}</h2>

                    <div className={classes.Button}>
                        {ownProfile ? (
                            <PrimaryButton
                                text="Edit profile"
                                onButtonClick={onClickButton}
                                buttonColor="editProfileBtn"
                            />
                        ) : (
                            <PrimaryButton
                                text="Follow"
                                onButtonClick={onClickButton}
                                buttonColor="followBtn"
                            />
                        )}
                    </div>
                </div>
                <ul className={classes.List}>
                    <li>
                        <b>{numberOfposts}</b> posts
                    </li>
                    <li>
                        <b>{followers}</b> followers
                    </li>
                    <li>
                        <b>{following}</b> following
                    </li>
                </ul>

                <div className={classes.Song}>
                    <p>{user?.favoriteSong}</p>
                </div>

                <div className={classes.About}>
                    <h1>{user?.name}</h1>
                    <br />

                    <p>{user?.biography}</p>
                </div>
            </section>
        </header>
    );
};

export default ProfileView;
