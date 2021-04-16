import React, { useEffect } from 'react';
import {
    useLoggedInUser,
    useLoggedInUserUpdate,
} from '../../../contexts/LoggedInUserContext';
import PrimaryButton from '../../common/buttons/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../common/buttons/SecondaryButton/secondaryButton';
import LogoutButton from '../../common/buttons/LogoutButton/LogoutButton';
import fire from '../../../fire';

import classes from './homePage.module.scss';

const HomePage: React.FC = () => {
    const loggedInUser = useLoggedInUser();
    const updateLoggedInUser = useLoggedInUserUpdate();

    return (
        <div className={classes.HomePage}>
            This is the Home Page
            <PrimaryButton
                text="Change to user 0"
                onButtonClick={() => updateLoggedInUser('rrudling@kth.se')}
                buttonColor="green"
            />
            <SecondaryButton
                text="Change to user 1"
                onButtonClick={() => updateLoggedInUser('johanlam@kth.se')}
                buttonColor="black"
            />
            <strong>
                {loggedInUser?.email} <br />
                {loggedInUser?.favoriteSong.title} <br />
                {loggedInUser?.name}
            </strong>
            <LogoutButton></LogoutButton>
        </div>
    );
};

export default HomePage;
