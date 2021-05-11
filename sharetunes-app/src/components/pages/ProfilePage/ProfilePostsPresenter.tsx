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
    const { posts } = useDatabase();
    const userId = user?.email;

    const userPosts = Object.values(posts).filter((post: any) => {
        return post.emailOfPublisher === userId;
    });

    return <ProfilePostsView posts={userPosts} />;
};

export default ProfilePostsPresenter;
