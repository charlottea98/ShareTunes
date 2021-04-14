import React, { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage/LoginPage';
import TestHomePage from './components/LoginPage/TestHomePage';
import fire from './fire';
import firestore from './firestore';
import firebase from 'firebase';

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
    const [profileData, setProfileData] = useState<Object>({});

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
     
        <Router>
            <Switch>
                <Route exact path={['/', '/home']}>
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
                <Route exact path="/login">
                    <LoginPage/>  
                </Route>
            </Switch>
        </Router>

    );
};

export default App;
