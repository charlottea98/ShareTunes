import React from 'react';
import classes from './logo.module.scss';
import { useHistory } from "react-router-dom";

import LogoView from './LogoView';

interface Props {
    fontSize?: string,
    clickable?: boolean
}

const LogoPresenter : React.FC<Props> = ({fontSize, clickable=false}) => {
    const history = useHistory();

    const logoClickedHandler = () => {
        if (clickable) {
            history.replace('/home');
        }
    }

    return (
        <LogoView 
            fontSize = {fontSize} 
            logoClickedHandler = {logoClickedHandler}
            clickable = {clickable}
        />
    );
}

export default LogoPresenter;