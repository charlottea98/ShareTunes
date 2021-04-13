import React, {useEffect, useState} from 'react';
import LoginPage from './components/LoginPage/LoginPage';
import TestHomePage from './components/LoginPage/TestHomePage';
import fire from './fire';
import firebase from "firebase/app";

import './App.scss';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PublishButton from './components/common/buttons/PrimaryButton/PrimaryButton';
import LogInButton from './components/common/buttons/SecondaryButton/secondaryButton';
import Menu from './components/common/Menu/Menu';
import HomePage from './components/pages/HomePage/HomePage';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import FeedPage from './components/pages/FeedPage/FeedPage';

const App: React.FC = () => {
    const [coffeeData, setCoffeeData] = useState<string | null>(null);

    useEffect(() => {
        fetch(
            'https://my-json-server.typicode.com/charlottea98/CoffeeApp/coffees'
        )
            .then((res) => res.json())
            .then((data) => {
                setCoffeeData(JSON.stringify(data));
            });
    });

    const [user, setUser] = useState<string | firebase.User >('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [hasAccount, setHasAccount] = useState<boolean>(false);
    

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    };

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }

    const handleLogin = () => {
        clearErrors();
        fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(err => {
            switch(err.code){
                case 'auth/invalid-email':
                case 'auth/user-disabled':
                case 'auth/user-not-found':
                    setEmailError(err.message);
                    break;
                case 'auth/wrong-password':
                    setPasswordError(err.message);
                    break;
            }
        });
    };

    const handleSignup = () => {
        clearErrors();
        fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(err => {
            switch(err.code){
                case 'auth/email-already-in-use':
                case 'auth/invalid-email':
                    setEmailError(err.message);
                    break;
                case 'auth/weak-password':
                    setPasswordError(err.message);
                    break;
            }
        });
    }

    const handleLogout = () => {
        fire.auth().signOut();
    }

    const authListener = () => {
        fire.auth().onAuthStateChanged((user) => {
            if(user){
                clearInputs();
                setUser(user);
            }
            else {
                setUser('');
            }
        });
    };

    useEffect(() => {
        authListener();
    }, []);

    return (
        <div>
            {user ? (
            <div>
                <Router>
                    <Switch>
                        <Route exact path={["/", "/home"]}>
                            <Menu />
                            <HomePage />
                        </Route>

                        <Route exact path='/profile'>
                            <Menu />
                            <ProfilePage />
                        </Route>
                        <Route exact path='/feed'>
                            <Menu />
                            <FeedPage />
                        </Route>
                    </Switch>
                <button onClick={handleLogout}>Log out</button>
                </Router>
            </div>
            ) : (
                <LoginPage email={email} setEmail={setEmail} password = {password} setPassword={setPassword}
                handleLogin={handleLogin} handleSignup={handleSignup} hasAccount={hasAccount}
                setHasAccount={setHasAccount} emailError={emailError} passwordError={passwordError}/>
                )}
        </div>
    );
};

export default App;
