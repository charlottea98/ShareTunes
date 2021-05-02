import React, { useEffect, useState } from 'react';


import LoginPresenter from './components/pages/LoginPage/LoginPresenter';
import firestore from './firestore';
import firebase from 'firebase';

import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MenuPresenter from './components/common/Menu/MenuPresenter';
import DiscoverPage from './components/pages/DiscoverPage/DiscoverPage';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import HomePage from './components/pages/HomePage/HomePage';
import LoggedInUserProvider from './contexts/LoggedInUserContext';

const App: React.FC = () => {
    const [profileData, setProfileData] = useState<Object>({});

    useEffect(() => {
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
    }, []);

    return (
        <LoggedInUserProvider>
            <Router>
                <Switch>
                    <Route exact path='/discover'>
                        <MenuPresenter />
                        <DiscoverPage />
                    </Route>
                    <Route exact path="/profile">
                        <MenuPresenter />
                        <ProfilePage userObj={profileData} />
                    </Route>
                    <Route exact path="/home">
                        <MenuPresenter />
                        <HomePage />
                    </Route>
                    <Route exact path={['/', '/login']}>
                        <LoginPresenter/>             
                    </Route>
                </Switch>
            </Router>
        </LoggedInUserProvider>
    );
};

export default App;

