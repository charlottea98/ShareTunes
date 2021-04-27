import React from 'react';
import classes from './userImage.module.scss';
import { useHistory } from "react-router-dom";

import RasmusImage from '../../../Resources/images/profileImages/rasmus1.jpg';

interface Props {
    diameter: string,
    userImageClickedHandler: () => void,
    isActive: boolean
}

const UserImageView : React.FC<Props> = ({diameter, userImageClickedHandler, isActive}) => {
    return <div
        className={classes.UserImage}
        style = {{
            "width": diameter,
            "height": diameter,
            "backgroundSize": `${parseInt(diameter) * 1.15}px`,
            "backgroundImage": `url(${RasmusImage})`,
            "border": isActive ? "2px solid #fec46e" : ""
        }}
        onClick = {userImageClickedHandler}
    />;
}

export default UserImageView;