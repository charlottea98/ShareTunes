import React, { ReactNode, useEffect, useState } from 'react';
import LoginView from './LoginView';
import SignUpView from './SignUpView';
import firebase from 'firebase';
import fire from '../../../fire';

import { DatabaseHandler } from '../../../utility/databaseHandler';

import {
    useLoggedInUser,
    useLoggedInUserUpdate,
} from '../../../contexts/LoggedInUserContext';
import { useHistory } from 'react-router';

interface Props {}

const LoginPresenter: React.FC<Props> = () => {
    const [user, setUser] = useState<string | firebase.User>(''); // const [user, setUser] = useState<string | firebase.User>('');
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
            // Kolla message och hantera det 
        }
    };

    const confirmSignUp = () => {
        clearErrors();
        if (
            password1 == password2 &&
            name.trim().length &&
            username.trim().length
        ) {
            handleSignup();
        } else if (password1 != password2) {
            setPasswordError('Passwords do not match');
        } else if (!name.trim().length) {
            setNameError('You have to fill in your name');
        } else if (!username.trim().length) {
            setUsernameError('You have to fill in a username');
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

    const authListener = () => { // Kommentar från Rasmus: Vad gör det här? Är inte helt säker så vågar inte flytta själv till DatabaseHandler
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                clearInputs();
                setUser(user);
            } else {
                setUser('');
            }
        });
    };

    const handleProfilePictureChange = (newProfilePictureURL: string) => {
        setProfilePictureURL(newProfilePictureURL);
    }

    useEffect(() => {
        authListener();
    }, []);

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
