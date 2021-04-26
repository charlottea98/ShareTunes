import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import classes from './menu.module.scss';

import MenuLink from "./MenuLink/MenuLink";
import MobileMenuButton from "./HamburgerButton/MobileMenuButton";

interface MenuLink {
    pageLink: string,
    name: string
}

interface Props {
    menuLinks: Array<MenuLink>,
    showMobileMenu: boolean,
    setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>,
    menuLinkClickedHandler: (pageLink: string) => void
}

const Menu: React.FC<Props> = ({menuLinks, showMobileMenu, setShowMobileMenu, menuLinkClickedHandler}) => {
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