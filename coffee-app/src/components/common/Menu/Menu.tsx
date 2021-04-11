import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import classes from './menu.module.scss';

import MenuLink from "./MenuLink/MenuLink";
import MobileMenuButton from "./HamburgerButton/MobileMenuButton";

interface Props {

}

const menuLinks = [
    {
        pageLink: '/',
        name: 'Home'
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
        <>
            <div className={showMobileMenu ? classes.Menu : [classes.Menu, classes.MenuShadow].join(" ")}>
                <div className={classes.buttonsContainer}>
                    {
                        menuLinks.map(menuLink => (
                            <MenuLink
                                key = {menuLink.pageLink}
                                pageLink = {menuLink.pageLink}
                                name = {menuLink.name}
                                goToAddress = {menuLinkClickedHandler}
                            />
                        ))
                    }
                </div>

                <MobileMenuButton
                    showingMobileMenu = {showMobileMenu}
                    onClick = {() => setShowMobileMenu(!showMobileMenu)}
                />
            </div>
            <div className={showMobileMenu ? classes.showMenuModal : classes.hideMenuModal}>
                {
                    menuLinks.map(menuLink => (
                        <MenuLink
                            key = {menuLink.pageLink}
                            pageLink = {menuLink.pageLink}
                            name = {menuLink.name}
                            goToAddress = {menuLinkClickedHandler}
                            inMobileMenu = {true}
                        />
                    ))
                }
            </div>

            <div
                className = {showMobileMenu
                    ? classes.modalBackground
                    : [classes.modalBackground, classes.hideModalBackground].join(" ")
                }
                onClick={() => setShowMobileMenu(false)}
            />
        </>
    )
}

export default Menu;