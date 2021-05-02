import React, { useEffect, useState } from 'react';
import LoginPage from './components/pages/LoginPage/LoginPage';
import firestore from './firestore';
import firebase from 'firebase';

import './App.scss';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PublishButton from './components/common/buttons/PrimaryButton/PrimaryButton';
import LogInButton from './components/common/buttons/SecondaryButton/secondaryButton';
import MenuPresenter from './components/common/Menu/MenuPresenter';
<<<<<<< HEAD
import DiscoverPage from './components/pages/DiscoverPage/DiscoverPage';
import ProfilePresenter from './components/pages/ProfilePage/ProfilePresenter';

=======
import DiscoverPagePresenter from './components/pages/DiscoverPage/DiscoverPagePresenter';
>>>>>>> c6f146f7e3d8eaac62398814e154eda3ba598ca5
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import HomePage from './components/pages/HomePage/HomePagePresenter';
import PublishPage from './components/pages/PublishPage/PublishPagePresenter';

import LoggedInUserProvider from './contexts/LoggedInUserContext';

const App: React.FC = () => {
    const [profileData, setProfileData] = useState<Object>({});
    const [user, setUser] = useState<string | firebase.User>('');

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
                    <Route exact path="/discover">
                        <MenuPresenter />
                        <DiscoverPage />
                    </Route>
                    <Route exact path="/profile">
                        <MenuPresenter />
                        <ProfilePresenter userObj={profileData} />
                    </Route>
                    <Route exact path="/home">
                        <MenuPresenter />
                        <div className="pageContainer">
                            <HomePage />
                        </div>
                    </Route>
                    <Route exact path="/discover">
                        <MenuPresenter />
<<<<<<< HEAD
                        <div className="pageContainer">
                            <DiscoverPage />
                        </div>
=======
                        <div className="pageContainer"><DiscoverPagePresenter /></div>
>>>>>>> c6f146f7e3d8eaac62398814e154eda3ba598ca5
                    </Route>
                    <Route exact path="/publish">
                        <MenuPresenter />
                        <div className="pageContainer">
                            <PublishPage />
                        </div>
                    </Route>
                    <Route exact path="/profile">
                        <MenuPresenter />
                        <div className="pageContainer">
                            <ProfilePage userObj={profileData} />
                        </div>
                    </Route>

                    <Route exact path={['/', '/login']}>
                        <LoginPage user={user} setUser={setUser} />
                        <LoginPage user={user} setUser={setUser} />
                    </Route>
                </Switch>
            </Router>
        </LoggedInUserProvider>
    );
};

export default App;
