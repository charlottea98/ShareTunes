import React from 'react';
import EditProfileView from './EditProfileView';
import {
    useLoggedInUser,
    useLoggedInUserUpdate,
} from '../../../../contexts/LoggedInUserContext';

const EditProfilePresenter: React.FC = () => {
    const user = useLoggedInUser();
    return <EditProfileView user={user} />;
};

export default EditProfilePresenter;
