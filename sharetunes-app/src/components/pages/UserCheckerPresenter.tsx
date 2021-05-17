import React, { useEffect } from 'react';
import {
    useLoggedInUser,
    useLoggedInUserUpdate,
} from '../../contexts/LoggedInUserContext';

import MessageToUserPage from './MessageToUserPage/MessageToUserPagePresenter';

import { useHistory } from 'react-router-dom';
import profileNoData from './ProfilePage/ProfileNoData';

const UserCheckerPresenter: React.FC = ({ children }) => {
    const loggedInUser = useLoggedInUser();
    const updateLoggedInUser = useLoggedInUserUpdate();
    const history = useHistory();

    let session = sessionStorage.getItem('user-session');

    useEffect(() => {
        if (session !== null && !loggedInUser) {
            updateLoggedInUser(session);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        profileNoData(loggedInUser, session) || (
            <div>
                {loggedInUser === null ? (
                    <MessageToUserPage
                        emotion="sad"
                        message="You need to be logged in to use our website!"
                        actionButtonFunc={() => history.push('/login')}
                        actionButtonText="Take me to the login page"
                        pauseRender={true}
                    />
                ) : (
                    children
                )}
            </div>
        )
    );
};

export default UserCheckerPresenter;
