import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import classes from './menu.module.scss';

import MenuLink from "./MenuLink/MenuLink";
import MobileMenuButton from "./HamburgerButton/MobileMenuButton";

import MenuView from './MenuView';

interface Props {

}

const menuLinks = [
    {
        pageLink: '/discover',
        name: 'Discover'
    },
    {
        pageLink: '/profile',
        name: 'My Profile'
    },
    {
        pageLink: '/feed',
        name: 'Feed'
    }
];

const Menu: React.FC<Props> = () => {
    const history = useHistory();
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
    const menuLinkClickedHandler = (pageLink: string) => {
        setShowMobileMenu(false);
        history.replace(pageLink);
    }

    return (
        <MenuView 
            menuLinks = {menuLinks} 
            showMobileMenu = {showMobileMenu}
            setShowMobileMenu = {setShowMobileMenu}
            menuLinkClickedHandler = {menuLinkClickedHandler}
        />
    )
}

export default Menu;