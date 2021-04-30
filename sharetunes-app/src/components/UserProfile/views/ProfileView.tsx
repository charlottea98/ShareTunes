import React from 'react';
import classes from './profileView.module.scss';

interface Props {
    imgSource: string;
    firstName: string;
    lastName: string;
    email: string;
}
const ProfileView: React.FC<Props> = ({
    imgSource,
    firstName,
    lastName,
    email,
}) => {
    return (
        <div className={classes.ProfileView}>
            <h1>
                {firstName} {lastName}
            </h1>
            <p>{email} </p>
            <img src={imgSource} alt="Profile picture" />
            <p>Description</p>
            <p>Some more text</p>
        </div>
    );
};

export default ProfileView;
