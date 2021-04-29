import React, { useEffect, useState } from 'react';
import { useLoggedInUser, useLoggedInUserUpdate } from '../../../contexts/LoggedInUserContext';
import PrimaryButton from '../../common/buttons/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../common/buttons/SecondaryButton/secondaryButton';
import LogoutButton from '../../common/buttons/LogoutButton/LogoutButton';
import Searchbar from './Searchbar';
import firestore from '../../../firestore';
import firebase from 'firebase/app';

import classes from './discoverPage.module.scss';

import { CLIENT_ID, CLIENT_SECRET } from '../../../utility/keys';

import DiscoverPageView from './DiscoverPageView';

const DiscoverPage : React.FC = () => {
    const loggedInUser = useLoggedInUser();
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        setPosts([]);
        firestore.collection('posts').get().then(snapshot => {
            snapshot.docs.map(doc => {
                setPosts(oldArray => [...oldArray, doc.data()]);
            });
        })
    }, []);



    return (
        <div className={classes.DiscoverPage}>
            <DiscoverPageView user={loggedInUser} posts={posts}/>
        </div>
    )
}

export default DiscoverPage;