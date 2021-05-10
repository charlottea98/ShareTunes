import React from 'react';
import ProfilePostsView from './ProfilePostsView';
import {
    useLoggedInUser,
    useLoggedInUserUpdate,
} from '../../../contexts/LoggedInUserContext';
import { useDatabase } from '../../../contexts/DatabaseContext';

interface Props {}

const ProfilePostsPresenter: React.FC<Props> = () => {
    const user = useLoggedInUser();
    const setUser = useLoggedInUserUpdate();
    const db = useDatabase();

    return <ProfilePostsView posts={db.posts} />;
};

export default ProfilePostsPresenter;
