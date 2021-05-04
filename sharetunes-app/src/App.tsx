import React, { useEffect, useState } from 'react';


import LoginPresenter from './components/pages/LoginPage/LoginPresenter';
import firestore from './firestore';
import firebase from 'firebase';

import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MenuPresenter from './components/common/Menu/MenuPresenter';
import DiscoverPagePresenter from './components/pages/DiscoverPage/DiscoverPagePresenter';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';

import HomePage from './components/pages/HomePage/HomePagePresenter';
import PublishPage from './components/pages/PublishPage/PublishPagePresenter';

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
                    <Route exact path="/home">
                        <MenuPresenter />
                        <div className="pageContainer"><HomePage /></div>
                    </Route>
                    <Route exact path='/discover'>
                        <MenuPresenter />
                        <div className="pageContainer"><DiscoverPagePresenter /></div>
                    </Route>
                    <Route exact path="/publish">
                        <MenuPresenter />
                        <div className="pageContainer"><PublishPage /></div>
                    </Route>
                    <Route exact path="/profile">
                        <MenuPresenter />
                        <div className="pageContainer"><ProfilePage userObj={profileData} /></div>
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

