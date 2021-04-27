import React from 'react';
import classes from './userImage.module.scss';
import { useHistory } from "react-router-dom";

import UserImageView from './UserImageView';

interface Props {
    diameter: string,
    isActive: boolean
}

const UserImagePresenter : React.FC<Props> = ({diameter, isActive}) => {
    const history = useHistory();

    const userImageClickedHandler = () => {
        history.replace('/profile');
    }

    return <UserImageView 
        diameter = {diameter}
        userImageClickedHandler={userImageClickedHandler}
        isActive = {isActive}
    />;
}

export default UserImagePresenter;