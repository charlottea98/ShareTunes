import React from 'react';
import classes from './menuLink.module.scss';

interface Props {
    pageLink: string,
    name: string,
    goToAddress: (pageAddress: string) => void,
    inMobileMenu?: Boolean
}

const MenuLink : React.FC<Props> = ({
    pageLink,
    name,
    goToAddress,
    inMobileMenu=false
}) => {
    return (
        <button
            className={!inMobileMenu ? classes.MenuLink : classes.MobileMenuLink}
            onClick = {() => goToAddress(pageLink)}
        >
            {name}
        </button>
    )
}

export default MenuLink;