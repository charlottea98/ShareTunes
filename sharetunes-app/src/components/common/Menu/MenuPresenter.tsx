import React from 'react';
import { useLocation } from "react-router-dom";

import DesktopMenuView from './DesktopMenuView/DesktopMenuView';
import MobileMenuView from './MobileMenuView/MobileMenuView';

interface Props {

}

const Menu: React.FC<Props> = () => {
    const location = useLocation();

    return (
        <>
            <DesktopMenuView userImageActive = {location.pathname === '/profile'}/>
            <MobileMenuView userImageActive = {location.pathname === '/profile'}/>
        </>
    )
}

export default Menu;