import React, { useState } from 'react';
import { useLocation } from "react-router-dom";

import classes from './menu.module.scss';

import MenuView from './MenuView';

interface Props {

}


const Menu: React.FC<Props> = () => {
    const location = useLocation();


    return (
        <MenuView 
            userImageActive = {location.pathname === '/profile'}
        />
    )
}

export default Menu;