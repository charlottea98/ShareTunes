import React from 'react';
import ProfilePostsView from './ProfilePostsView';
import {
    useLoggedInUser,
    useLoggedInUserUpdate,
} from '../../../contexts/LoggedInUserContext';
import { useDatabase } from '../../../contexts/DatabaseContext';
import { Post } from '../../../utility/types';

interface Props {}

const ProfilePostsPresenter: React.FC<Props> = () => {
    const loggedInUser = useLoggedInUser();
    const setUser = useLoggedInUserUpdate();
    const { posts } = useDatabase();

    let postsToShow: Array<Post> = [];

    if (loggedInUser) {
        postsToShow = posts.filter(post => post.emailOfPublisher === loggedInUser.email);
        postsToShow = postsToShow.sort((postA, postB) => {
            if (postA.date < postB.date) {
                return 1;
            } else if (postA.date > postB.date) {
                return -1;
            } else {
                return 0;
            }
        })
    }

    return <ProfilePostsView posts={postsToShow} />;
};

export default ProfilePostsPresenter;
