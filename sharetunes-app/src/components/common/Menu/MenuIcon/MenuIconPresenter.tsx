import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import MenuIconView from './MenuIconView';
import { faCompass, faHome, faBell } from '@fortawesome/free-solid-svg-icons';


interface Props {
    menuIcon: string,
    height: string,
    showNotifications?: boolean
}

const MenuIconPresenter: React.FC<Props> = ({menuIcon, height, showNotifications=false}) => {
    const location = useLocation();
    const history = useHistory();

    let icon, isActive, iconClickHandler;


    if (menuIcon === 'compass') {
        icon = faCompass;
        iconClickHandler = () => history.push('/discover');
        isActive = location.pathname === '/discover';
    } else if (menuIcon === 'home') {
        icon = faHome;
        isActive = location.pathname === '/home';
        iconClickHandler = () => history.push('/home');
    } else {
        icon = faBell;
        isActive = showNotifications;
        iconClickHandler = () => history.push(location.pathname);
    }

    return <MenuIconView 
        height = {height} 
        icon = {icon} 
        active = {isActive} 
        iconClickHandler = {iconClickHandler}
    />
}

export default MenuIconPresenter;