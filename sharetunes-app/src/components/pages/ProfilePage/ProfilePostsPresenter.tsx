import React from 'react';
import ProfilePostsView from './ProfilePostsView';
import {
    useLoggedInUser,
    useLoggedInUserUpdate,
} from '../../../contexts/LoggedInUserContext';

interface Props {}

const ProfilePostsPresenter: React.FC<Props> = () => {
    const user = useLoggedInUser();
    const setUser = useLoggedInUserUpdate();

    return <ProfilePostsView user={user} />;
};

export default ProfilePostsPresenter;
