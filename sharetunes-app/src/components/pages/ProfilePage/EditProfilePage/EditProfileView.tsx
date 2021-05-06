import React from 'react';
import classes from './editProfileView.module.scss';

interface Props {
    user: any;
}

const EditProfileView: React.FC<Props> = ({ user }) => {
    return (
        <div className={classes.EditProfileView}>
            <h1>THIS IS THE EDIT PROFILE PAGE</h1>
            <img
                className={classes.profileImg}
                src={user.profilePictureURL}
                alt="Profile picture"
            />

            <h2>Profile picture URL</h2>
            <p>{user.profilePictureURL}</p>

            <h2>Name</h2>
            <p>{user.name}</p>
            <h2>Username</h2>
            <p>{user.username}</p>

            <h2>Biography</h2>
            <p>{user.biography}</p>

            <h2>My favorite song</h2>
            <p>{user.favoriteSong}</p>
            <button>Change favorite song</button>

            <button>Cancel</button>
            <button>Save</button>
        </div>
    );
};

export default EditProfileView;
