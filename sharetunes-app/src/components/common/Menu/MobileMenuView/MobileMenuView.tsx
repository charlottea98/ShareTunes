import React from 'react';
import classes from './mobileMenu.module.scss';

import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserImage from '../../UserImage/UserImagePresenter';
import MenuIcon from '../MenuIcon/MenuIconPresenter';

interface Props {
    userImageActive: boolean
}

const DesktopMenuView: React.FC<Props> = ({userImageActive}) => {
    return (
        <div className={classes.Menu}>
            <div className={classes.menuContent}>
                <div className={classes.iconContainer}>
                    <MenuIcon menuIcon="home" height="35px" />
                </div>

                <div className={classes.iconContainer}>
                    <MenuIcon menuIcon="search" height="35px" />
                </div>

                <div className={classes.iconContainer}>
                    <MenuIcon menuIcon="plus" height="35px" />
                </div>

                {/* <div className={classes.iconContainer}><MenuIcon menuIcon="bell" height="30px" /></div> */}
                
                <div className={classes.iconContainer}>
                    <UserImage diameter="35px" isActive={userImageActive} />
                </div>

                <div className={classes.iconContainer}>
                    <MenuIcon menuIcon="signOut" height="35px" />
                </div>
            </div>
        </div>
    )
}

export default DesktopMenuView;