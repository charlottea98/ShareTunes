import React from 'react';
import classes from './desktopMenu.module.scss';


import ShareTunesLogo from '../../Logo/LogoPresenter';
import UserImage from '../../UserImage/UserImagePresenter';
import MenuIcon from '../MenuIcon/MenuIconPresenter';

interface Props {
    userImageActive: boolean
}

const DesktopMenuView: React.FC<Props> = ({userImageActive}) => {
    return (
        <div className={classes.Menu}>
            <div className={classes.menuContent}>
                <ShareTunesLogo fontSize="30px" />

                <div className={classes.searchbarPlaceHolder}>Searchbar</div>

                <div className={classes.iconsToRight}>
                    <MenuIcon menuIcon="home" height="30px" />
                    <MenuIcon menuIcon="compass" height="30px" />
                    <MenuIcon menuIcon="plus" height="30px" />
                    {/* <MenuIcon menuIcon="bell" height="30px" /> */}

                    <UserImage diameter="30px" isActive={userImageActive} />
                </div>
                
            </div>
        </div>
    )
}

export default DesktopMenuView;