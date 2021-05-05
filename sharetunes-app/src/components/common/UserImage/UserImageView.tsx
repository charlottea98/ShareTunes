import React from 'react';
import classes from './userImage.module.scss';

interface Props {
    diameter: string,
    userImageClickedHandler: () => void,
    isActive: boolean,
    profileImage: string
}

const UserImageView : React.FC<Props> = ({diameter, userImageClickedHandler, isActive, profileImage}) => {
    return <div
        className={classes.UserImage}
        style = {{
            "width": diameter,
            "height": diameter,
            "backgroundSize": `${parseInt(diameter) * 1.15}px`,
            "backgroundImage": `url(${profileImage})`,
            "border": isActive ? "2px solid #fec46e" : ""
        }}
        onClick = {userImageClickedHandler}
    />;
}

export default UserImageView;