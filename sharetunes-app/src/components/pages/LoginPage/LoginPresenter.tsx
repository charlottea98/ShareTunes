import React, { useEffect, useState } from 'react';
import LoginView from './LoginView';
import SignUpView from './SignUpView';
import firebase from 'firebase';
import fire from '../../../fire';

import { DatabaseHandler } from '../../../utility/databaseHandler';

import { useLoggedInUserUpdate } from '../../../contexts/LoggedInUserContext';
import { useHistory } from 'react-router';

interface Props {}

const LoginPresenter: React.FC<Props> = () => {
    //const [user, setUser] = useState<string | firebase.User>(''); // const [user, setUser] = useState<string | firebase.User>('');
    const [email, setEmail] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');

    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [hasAccount, setHasAccount] = useState<boolean>(true);

    const [name, setName] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');

    const [profilePictureURL, setProfilePictureURL] = useState<string>('');

    const history = useHistory();

    const updateLoggedInUser = useLoggedInUserUpdate();

    const clearAll = () => {
        clearInputs();
        clearErrors();
    };

    const clearInputs = () => {
        setEmail('');
        setPassword1('');
        setPassword2('');
        setName('');
        setUsername('');
    };

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
        setUsernameError('');
        setNameError('');
    };

    const handleLogin = async () => {
        clearErrors();
        let message = await DatabaseHandler.loginUser(email, password1);

        if (message === "User logged in successfully") {
            updateLoggedInUser(email);
            history.push('/discover');
        } else {
            if(message != undefined)
                if(message == 'The password is invalid or the user does not have a password.')
                    setPasswordError(message);
                else{
                    setEmailError(message)
                }
        }
    };

    const confirmSignUp = () => {
        clearErrors();
        let someError = false;
        
        if (password1 != password2) {
            setPasswordError('Passwords do not match');
            someError = true;
        }
        
        if (!name.trim().length) {
            setNameError('You have to fill in your name');
            someError = true;
        }

        if (name.length > 100) {
            setNameError('Your name can be a maximum of 100 characters');
            someError = true;
        } 

        if (!username.trim().length) {
            setUsernameError('You have to fill in a username');
            someError = true;
        } 

        if (username.includes(" ")) {
            setUsernameError("You can't use blank spaces in your username");
            someError = true;
        }

        if (username.split("").some(char => char.match(/[^a-z0-9 ]/g))) {
            setUsernameError("Use small characters a-z and/or numbers 0-9");
            someError = true;
        } 

        if (username.length > 15) {
            setUsernameError('Your username can be a maximum of 15 characters');
            someError = true;
        } 
        
        if (!email.trim().length) {
            setEmailError('You have to fill in your email');
            someError = true;
        }
        
        if (!password1.trim().length) {
            setPasswordError('You have to fill in a password');
            someError = true;
        }

        if(!someError) {
            handleSignup();
        }
    };
    const handleSignup = async () => {
        let message = await DatabaseHandler.signUpUser(name, username, profilePictureURL, email, password1);

        if (message === "New user added in database") {
            updateLoggedInUser(email);
            history.push('/discover');
        } else if (message === "The email address is badly formatted.") {
            setEmailError(message);
        }
    };


    const handleProfilePictureChange = (newProfilePictureURL: string) => {
        setProfilePictureURL(newProfilePictureURL);
    }

    if (hasAccount) {
        return (
            <LoginView
                clearAll={clearAll}
                hasAccount={hasAccount}
                setHasAccount={setHasAccount}
                email={email}
                setEmail={setEmail}
                emailError={emailError}
                password1={password1}
                setPassword1={setPassword1}
                passwordError={passwordError}
                handleLogin={handleLogin}
            />
        );
    } else {
        return (
            <SignUpView
                clearAll={clearAll}
                hasAccount={hasAccount}
                setHasAccount={setHasAccount}
                email={email}
                setEmail={setEmail}
                emailError={emailError}
                password1={password1}
                password2={password2}
                setPassword1={setPassword1}
                setPassword2={setPassword2}
                passwordError={passwordError}
                name={name}
                setName={setName}
                nameError={nameError}
                username={username}
                setUsername={setUsername}
                usernameError={usernameError}
                confirmSignup={confirmSignUp}
                handleProfilePictureChange = {handleProfilePictureChange}
            />
        );
    }
};

export default LoginPresenter;
