import React, { useEffect } from 'react';
import { useLoggedInUser, useLoggedInUserUpdate } from '../../../contexts/LoggedInUserContext';
import PrimaryButton from '../../common/buttons/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../common/buttons/SecondaryButton/secondaryButton';

import classes from './homePage.module.scss';

let user0 = {
    name: 'Rasmus Rudling',
    favoriteSong: {
        title: 'Midnight City',
        artist: 'M83',
        url: 'https://open.spotify.com/track/6GyFP1nfCDB8lbD2bG0Hq9?si=fNUnqyC7Sm2tIS9qhwtORQ'
    },
    email: 'rrudling@kth.se'
};

let user1 = {
    name: 'User1',
    favoriteSong: {
        title: 'Test',
        artist: 'M83',
        url: 'https://open.spotify.com/track/6GyFP1nfCDB8lbD2bG0Hq9?si=fNUnqyC7Sm2tIS9qhwtORQ'
    },
    email: 'user1@kth.se'
};

const HomePage : React.FC = () => {
    const loggedInUser = useLoggedInUser();
    const updateLoggedInUser = useLoggedInUserUpdate();

    return (
        <div className={classes.HomePage}>
            This is the Home Page
            <PrimaryButton 
                text = "Change to user 0"
                onButtonClick = {() => updateLoggedInUser(user0)}
                buttonColor = 'green'
            />
            <SecondaryButton
                text = "Change to user 1"
                onButtonClick = {() => updateLoggedInUser(user1)}
                buttonColor = 'black'
            />
            <strong>
                { loggedInUser?.email } <br />
                { loggedInUser?.favoriteSong.title } <br />
                { loggedInUser?.name }
            </strong>
        </div>
    )
}

export default HomePage;