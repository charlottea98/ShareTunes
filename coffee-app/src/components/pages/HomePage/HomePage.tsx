import React, { useEffect } from 'react';
import PrimaryButton from '../../common/buttons/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../common/buttons/SecondaryButton/secondaryButton';

import classes from './homePage.module.scss';

const HomePage : React.FC = () => {

    useEffect(() => {

    });

    return (
        <div className={classes.HomePage}>
            This is the Home Page
            <PrimaryButton 
                text = "Say hello"
                onButtonClick = {() => console.log("Hello! :)")}
                buttonColor = 'green'
            />
            <SecondaryButton
                text = "Say good bye"
                onButtonClick = {() => console.log("good bye! :(")}
                buttonColor = 'black'
            />
        </div>
    )
}

export default HomePage;