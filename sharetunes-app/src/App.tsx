import React from 'react';
import LoginPresenter from './components/pages/LoginPage/LoginPresenter';

import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// === PROVIDERS ===
import LoggedInUserProvider from './contexts/LoggedInUserContext';
import DatabaseProvider from './contexts/DatabaseContext';
import CurrentlyVisitedUserProfileProvider from './contexts/CurrentlyVisitedUserProfileContext';
import AudioContextProvider from './contexts/AudioContext';


import MenuPresenter from './components/common/Menu/MenuPresenter';
import ProfilePresenter from './components/pages/ProfilePage/ProfilePresenter';
import EditProfilePresenter from './components/pages/ProfilePage/EditProfilePage/EditProfilePresenter';
import DiscoverPagePresenter from './components/pages/DiscoverPage/DiscoverPagePresenter';
import HomePage from './components/pages/HomePage/HomePagePresenter';
import PublishPage from './components/pages/PublishPage/PublishPagePresenter';
import UserCheckerPresenter from './components/pages/UserCheckerPresenter';
import PageNotFound from './components/pages/MessageToUserPage/PageNotFoundPresenter';

const App: React.FC = () => {
    return (
        <DatabaseProvider>
            <LoggedInUserProvider>
                <CurrentlyVisitedUserProfileProvider>
                    <AudioContextProvider>
                        <Router>
                            <Switch>
                                <Route exact path="/profile">
                                    <UserCheckerPresenter>
                                        <MenuPresenter />
                                        <div className="pageContainer">
                                            <ProfilePresenter />
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
                    </AudioContextProvider>
                </CurrentlyVisitedUserProfileProvider>
            </LoggedInUserProvider>
        </DatabaseProvider>

    );
};

export default App;
