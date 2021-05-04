import React from 'react';
import classes from './profileView.module.scss';
import PrimaryButton from '../../common/buttons/PrimaryButton/PrimaryButton';

interface Props {
    user: any;
    onClickEditProfile: any;
}

const ProfileView: React.FC<Props> = ({ user, onClickEditProfile }) => {
    return (
        <div className={classes.ProfileView}>
            <img
                className={classes.profileImg}
                src={user.profilePicture}
                alt="Profile picture"
            />
            <h1>{user.username}</h1>
            <PrimaryButton
                text="Edit profile"
                onButtonClick={onClickEditProfile}
                buttonColor="green"
            />
            <button>Edit profile</button>

            <p>posts</p>
            <p>followers</p>
            <p>following</p>

            <p>{user.favoriteSong.title}</p>
            <p>{user.favoriteSong.artist}</p>

            <h2>{user.name}</h2>
            <p>{user.biography}</p>
            <p>{user.posts}</p>
        </div>
    );
};

export default ProfileView;
