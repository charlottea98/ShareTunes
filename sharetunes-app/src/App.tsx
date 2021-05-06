import React from 'react';

import LoginPresenter from './components/pages/LoginPage/LoginPresenter';

import './App.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
} from 'react-router-dom';

import MenuPresenter from './components/common/Menu/MenuPresenter';

import ProfilePresenter from './components/pages/ProfilePage/ProfilePresenter';
import ProfilePostsPresenter from './components/pages/ProfilePage/ProfilePostsPresenter';
import EditProfilePresenter from './components/pages/ProfilePage/EditProfilePage/EditProfilePresenter';

import DiscoverPagePresenter from './components/pages/DiscoverPage/DiscoverPagePresenter';

import HomePage from './components/pages/HomePage/HomePagePresenter';
import PublishPage from './components/pages/PublishPage/PublishPagePresenter';

import LoggedInUserProvider from './contexts/LoggedInUserContext';

import UserCheckerPresenter from './components/UserCheckerPresenter';
import MessageToUserPage from './components/pages/MessageToUserPage/MessageToUserPagePresenter';
import CurrentlyVisitedUserProfileProvider from './contexts/CurrentlyVisitedUserProfileContext';
import PageNotFound from './components/pages/MessageToUserPage/PageNotFoundPresenter';

const App: React.FC = () => {
    return (
        <LoggedInUserProvider>
            <CurrentlyVisitedUserProfileProvider>
                <Router>
                    <Switch>
                        <Route exact path="/profile">
                            <UserCheckerPresenter>
                                <MenuPresenter />
                                <div className="pageContainer">
                                    <ProfilePresenter />
                                    <ProfilePostsPresenter />
                                </div>
                            </UserCheckerPresenter>
                        </Route>
                        <Route exact path="/home">
                            <UserCheckerPresenter>
                                <MenuPresenter />
                                <div className="pageContainer">
                                    <HomePage />
                                </div>
                            </UserCheckerPresenter>
                        </Route>
                        <Route exact path="/discover">
                            <UserCheckerPresenter>
                                <MenuPresenter />
                                <div className="pageContainer">
                                    <DiscoverPagePresenter />
                                </div>
                            </UserCheckerPresenter>
                        </Route>
                        <Route exact path="/publish">
                            <UserCheckerPresenter>
                                <MenuPresenter />
                                <div className="pageContainer">
                                    <PublishPage />
                                </div>
                            </UserCheckerPresenter>
                        </Route>
                        <Route exact path="/profile/edit">
                            <UserCheckerPresenter>
                                <MenuPresenter />
                                <div className="pageContainer">
                                    <EditProfilePresenter />
                                </div>
                            </UserCheckerPresenter>
                        </Route>

                        <Route exact path={['/', '/login']}>
                            <LoginPresenter />
                        </Route>

                        <Route component={PageNotFound} />
                    </Switch>
                </Router>
            </CurrentlyVisitedUserProfileProvider>
        </LoggedInUserProvider>
    );
};

export default App;
