import React from 'react';
import { Post } from '../../../utility/types';
import classes from './homePage.module.scss';

import PostCard from '../../common/PostCard/PostCardPresenter';
import Button from '../../common/buttons/PrimaryButton/PrimaryButton';

import { addNewPost, addNewSong, addNewUser, createDataBase } from '../../../utility/firestoreCommunication';
import { faRoad } from '@fortawesome/free-solid-svg-icons';

interface Props {
    postsToShow: Array<Post>
}

const HomePageView : React.FC<Props> = ({postsToShow}) => {
    return (
        <div className={classes.HomePage}>
            <Button 
                text="create new song in Firestore"
                onButtonClick = {() => addNewSong("5qYf19BLOheApfe6NqhDPg")}
            />

            <Button 
                text="init songs collection"
                onButtonClick = {() => createDataBase(['songs'])}
            />
            {
                postsToShow.map(post => (
                    <PostCard 
                        pageToViewOn="home page"
                    />
                ))
            }
        </div>
    )
}

export default HomePageView;