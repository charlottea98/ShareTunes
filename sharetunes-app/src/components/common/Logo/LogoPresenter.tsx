import React from 'react';
import classes from './logo.module.scss';
import { useHistory } from "react-router-dom";

import LogoView from './LogoView';

interface Props {
    fontSize?: string
}

const LogoPresenter : React.FC<Props> = ({fontSize}) => {
    const history = useHistory();

    const logoClickedHandler = () => {
        history.replace('/home');
    }

    return <LogoView fontSize={fontSize} logoClickedHandler={logoClickedHandler} />;
}

export default LogoPresenter;