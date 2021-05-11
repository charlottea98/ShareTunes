import React from 'react';
import ProfileView from './ProfileView';
import {
    useLoggedInUser,
    useLoggedInUserUpdate,
} from '../../../contexts/LoggedInUserContext';
import { useHistory } from 'react-router-dom';
import { useDatabase } from '../../../contexts/DatabaseContext';

interface Props {}

const ProfilePresenter: React.FC<Props> = () => {
    const history = useHistory();
    const user = useLoggedInUser();
    const setUser = useLoggedInUserUpdate();
    const db = useDatabase();
    const userId = user?.email;

    const helperFunction = (arrIndex: number) => {
        const firestoreObj = Object.values(db)[arrIndex].filter((mail: any) => {
            return mail.id === userId;
        });
        return firestoreObj;
    };

    console.log(userId);

    const postsCount = user?.posts.length;
    const followers = helperFunction(0)[0].followers.length; // 0 is the index for followers
    const following = helperFunction(1)[0].following.length; // 1 is the index for following

    const handleEditProfile = () => {
        history.push('/profile/edit');
    };

    return (
        <ProfileView
            user={user}
            onClickEditProfile={handleEditProfile}
            numberOfposts={postsCount}
            followers={followers}
            following={following}
        />
    );
};

export default ProfilePresenter;
