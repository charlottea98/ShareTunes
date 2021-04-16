import React, { useEffect, useState } from 'react';
import LoginPage from './components/pages/LoginPage/LoginPage';
import TestHomePage from './components/pages/LoginPage/TestHomePage';
import fire from './fire';
import firestore from './firestore';
import firebase from 'firebase';
import { useHistory } from 'react-router';

import './App.scss';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PublishButton from './components/common/buttons/PrimaryButton/PrimaryButton';
import LogInButton from './components/common/buttons/SecondaryButton/secondaryButton';
import Menu from './components/common/Menu/Menu';
import HomePage from './components/pages/HomePage/HomePage';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import FeedPage from './components/pages/FeedPage/FeedPage';

import LoggedInUserProvider from './contexts/LoggedInUserContext';

const App: React.FC = () => {
    const [coffeeData, setCoffeeData] = useState<string | null>(null);
    const [profileData, setProfileData] = useState<Object>({});
    const [user, setUser] = useState<string | firebase.User>('');
    const history = useHistory();

    useEffect(() => {
        fetch(
            'https://my-json-server.typicode.com/charlottea98/CoffeeApp/coffees'
        )
            .then((res) => res.json())
            .then((data) => {
                setCoffeeData(JSON.stringify(data));
            });
        firestore
            .collection('users')
            .get()
            .then((snapshot) => {
                // console.log(snapshot.docs);
                snapshot.docs.forEach((doc) => {
                    // console.log(doc.data());
                    setProfileData(doc.data());
                });
            });
    },[]);


    return (
        <LoggedInUserProvider>
            <Router>
                <Switch>
                    <Route exact path='/home'>
                        <Menu />
                        <HomePage />
                    </Route>
                    <Route exact path="/profile">
                        <Menu />
                        <ProfilePage userObj={profileData} />
                    </Route>
                    <Route exact path="/feed">
                        <Menu />
                        <FeedPage />
                    </Route>
                    <Route exact path={['/', '/login']}>
                    <LoginPage user = {user} setUser = {setUser}/>
                    </Route>
                </Switch>
            </Router>
        </LoggedInUserProvider>
    );
};

export default App;
