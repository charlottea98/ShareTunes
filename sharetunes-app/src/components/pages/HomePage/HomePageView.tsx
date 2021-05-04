import React from 'react';
import { Post } from '../../../utility/types';
import classes from './homePage.module.scss';

import PostCard from '../../common/PostCard/PostCardPresenter';
import Button from '../../common/buttons/PrimaryButton/PrimaryButton';

import { addNewSong, createDataBase } from '../../../utility/firestoreCommunication';

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
                onButtonClick = {() => createDataBase()}
            />
            {
                postsToShow.map(post => (
                    <PostCard
                        key = {post.id}
                        postInfo = {post}
                        pageToViewOn="home page"
                    />
                ))
            }
        </div>
    )
}

export default HomePageView;