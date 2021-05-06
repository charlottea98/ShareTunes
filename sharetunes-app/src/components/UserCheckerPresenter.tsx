import React from 'react';
import { useLoggedInUser } from '../contexts/LoggedInUserContext';
import MessageToUserPage from './pages/MessageToUserPage/MessageToUserPagePresenter';

import { useHistory } from 'react-router-dom';

const UserCheckerPresenter: React.FC = ({children}) => {
    const loggedInUser = useLoggedInUser();
    const history = useHistory();

    return (
        <div>
            {
                loggedInUser === null ? 
                    <MessageToUserPage 
                        emotion = "sad" 
                        message = "You need to be logged in to use our website!"
                        actionButtonFunc = {() => history.push('/login')}
                        actionButtonText = "Take me to the login page"
                        pauseRender = {true}
                    /> : children
            }
        </div>
        
    )
}

export default UserCheckerPresenter;