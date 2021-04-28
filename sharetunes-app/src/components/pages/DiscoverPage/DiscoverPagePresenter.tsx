import React, { useState } from 'react';
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

    const getDiscoverPosts = () => {
        firestore.collection('posts').get().then(snapshot => {
            snapshot.docs.map(doc => {
                console.log(doc.data());
            });
        })
    }

    return (
        <div className={classes.DiscoverPage}>
            <DiscoverPageView user={loggedInUser}></DiscoverPageView>
            {getDiscoverPosts()}
        </div>
    )
}

export default DiscoverPage;