import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import MenuIconView from './MenuIconView';
import { faCompass, faHome, faBell, faSearch, faPlusCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { DatabaseHandler } from '../../../../utility/databaseHandler';


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
    } else if (menuIcon === 'search') {
        icon = faSearch;
        iconClickHandler = () => history.push('/discover');
        isActive = location.pathname === '/discover';
    } else if (menuIcon === 'plus') {
        icon = faPlusCircle;
        iconClickHandler = () => history.push('/publish');
        isActive = location.pathname === '/publish';
    } else if (menuIcon === 'signOut') {
        icon = faSignOutAlt;
        iconClickHandler = () => {
            DatabaseHandler.logoutUser().then(() => {
                history.push('/login');
            })
        };
        isActive = false;
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