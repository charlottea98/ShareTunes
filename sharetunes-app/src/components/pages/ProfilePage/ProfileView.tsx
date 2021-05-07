import React from 'react';
import classes from './profileView.module.scss';
import PrimaryButton from '../../common/buttons/PrimaryButton/PrimaryButton';
import { isDebuggerStatement } from 'typescript';

interface Props {
    user: any;
    onClickEditProfile: any;
}

const ProfileView: React.FC<Props> = ({ user, onClickEditProfile }) => {
    return (
        <header className={classes.ProfileViewHeader}>
            <img
                className={classes.ProfileImg}
                src={user.profilePictureURL}
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
                    <li>posts</li>
                    <li>followers</li>
                    <li>following</li>
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
