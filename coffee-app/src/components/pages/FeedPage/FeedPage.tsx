import React, { useEffect } from 'react';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';
import fire from '../../../fire';
import LogoutButton from '../../common/buttons/LogoutButton/LogoutButton';

import classes from './feedPage.module.scss';

const FeedPage : React.FC = () => {
    const loggedInUser = useLoggedInUser();

    return (
        <div className={classes.FeedPage}>
            This is the Feed Page <br />
            <strong>
            { loggedInUser?.email } <br />
            { loggedInUser?.favoriteSong.title } <br />
            { loggedInUser?.name }
            </strong>
            <LogoutButton></LogoutButton>
        </div>
    )
}

export default FeedPage;