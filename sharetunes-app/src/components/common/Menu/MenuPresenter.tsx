import React from 'react';
import { useLocation } from "react-router-dom";
import { useViewingOwnProfile } from '../../../contexts/CurrentlyVisitedUserProfileContext';

import DesktopMenuView from './DesktopMenuView/DesktopMenuView';
import MobileMenuView from './MobileMenuView/MobileMenuView';

interface Props {

}

const Menu: React.FC<Props> = () => {
    const location = useLocation();

    const viewingOwnProfile = useViewingOwnProfile();

    return (
        <>
            <DesktopMenuView userImageActive = {location.pathname === '/profile' && viewingOwnProfile}/>
            <MobileMenuView userImageActive = {location.pathname === '/profile' && viewingOwnProfile}/>
        </>
    )
}

export default Menu;