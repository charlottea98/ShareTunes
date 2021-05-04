import React from 'react';
import { useLoggedInUser } from '../contexts/LoggedInUserContext';
import PageNotFound from './pages/PageNotFoundView';

const UserCheckerPresenter: React.FC = ({children}) => {
    const loggedInUser = useLoggedInUser();
    console.log(loggedInUser);

    return (
        <div>
            {
                loggedInUser === null 
                    ? <PageNotFound />
                    : children
            }
        </div>
        
    )
}

export default UserCheckerPresenter;