import React, { useEffect, useState } from 'react';
import LoginPage from './components/pages/LoginPage/LoginPage';
import firestore from './firestore';
import firebase from 'firebase';

import './App.scss';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PublishButton from './components/common/buttons/PrimaryButton/PrimaryButton';
import LogInButton from './components/common/buttons/SecondaryButton/secondaryButton';
import MenuPresenter from './components/common/Menu/MenuPresenter';

import ProfilePresenter from './components/pages/ProfilePage/ProfilePresenter';
import EditProfilePresenter from './components/pages/ProfilePage/EditProfilePage/EditProfilePresenter';

import DiscoverPagePresenter from './components/pages/DiscoverPage/DiscoverPagePresenter';

import HomePage from './components/pages/HomePage/HomePagePresenter';
import PublishPage from './components/pages/PublishPage/PublishPagePresenter';

import LoggedInUserProvider from './contexts/LoggedInUserContext';

const App: React.FC = () => {
    const [user, setUser] = useState<string | firebase.User>('');

    return (
        <LoggedInUserProvider>
            <Router>
                <Switch>
                    <Route exact path="/profile">
                        <MenuPresenter />
                        <ProfilePresenter />
                    </Route>
                    <Route exact path="/home">
                        <MenuPresenter />
                        <div className="pageContainer">
                            <HomePage />
                        </div>
                    </Route>
                    <Route exact path="/discover">
                        <MenuPresenter />
                        <div className="pageContainer">
                            <DiscoverPagePresenter />
                        </div>
                    </Route>
                    <Route exact path="/publish">
                        <MenuPresenter />
                        <div className="pageContainer">
                            <PublishPage />
                        </div>
                    </Route>
                    <Route exact path="/profile/edit">
                        <MenuPresenter />
                        <EditProfilePresenter />
                    </Route>

                    <Route exact path={['/', '/login']}>
                        <LoginPage user={user} setUser={setUser} />
                    </Route>
                </Switch>
            </Router>
        </LoggedInUserProvider>
    );
};

export default App;
