import React from 'react';
import classes from './desktopMenu.module.scss';

import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ShareTunesLogo from '../../Logo/LogoPresenter';
import UserImage from '../../UserImage/UserImagePresenter';
import MenuIcon from '../MenuIcon/MenuIconPresenter';
import SearchBar from '../../../pages/DiscoverPage/SearchbarPresenter';
import { DatabaseHandler } from '../../../../utility/databaseHandler';
import { useHistory } from 'react-router-dom';

interface Props {
    userImageActive: boolean
}

const DesktopMenuView: React.FC<Props> = ({userImageActive}) => {
    const history = useHistory();

    return (
        <div className={classes.Menu}>
            <div className={classes.menuContent}>
                <ShareTunesLogo fontSize="30px" clickable={true} />

                <SearchBar/>

                <div className={classes.iconsToRight}>
                    <MenuIcon menuIcon="home" height="30px" />
                    <MenuIcon menuIcon="compass" height="30px" />
                    <MenuIcon menuIcon="plus" height="30px" />
                    {/* <MenuIcon menuIcon="bell" height="30px" /> */}

                    <UserImage diameter="30px" isActive={userImageActive} />

                    <div 
                        className={classes.signOut}
                        onClick = {() => {
                            DatabaseHandler.logoutUser()
                                .then(() => history.push('/login'))
                        }}
                    >
                        <span>Sign out</span>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default DesktopMenuView;