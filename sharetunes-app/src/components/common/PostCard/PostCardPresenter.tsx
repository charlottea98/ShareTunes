import React, {  useState } from 'react';

import PostCardView from './PostCardView';
import { Post, Comment } from '../../../utility/types';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';
import { DatabaseHandler } from '../../../utility/databaseHandler';

import { useLocation, useHistory } from 'react-router-dom';
import { useCurrentlyVisitedUserProfileUpdate } from '../../../contexts/CurrentlyVisitedUserProfileContext';

interface Props {
    postInfo: Post
}

const PostCardPresenter : React.FC<Props> = ({postInfo}) => {
    const currentlyVisitedUserProfileUpdate = useCurrentlyVisitedUserProfileUpdate();
    const loggedInUser = useLoggedInUser();
    const history = useHistory();
    const location = useLocation();

    const [commentText, setCommentText] = useState<string>("");
    const [showInteraction, setShowInteraction] = useState<boolean>(location.pathname === '/home');

    let userCanDeleteThisPost = false;

    if (loggedInUser && loggedInUser.username == postInfo?.usernameOfPublisher) {
        userCanDeleteThisPost = true;
    }

    let filledRatingArray = [];
    let nonFilledRatingArray = [];

    for (let i = 0; i < postInfo.rating; i++) {
        filledRatingArray.push(i);
    }

    for (let i = postInfo.rating; i < 5; i++) {
        nonFilledRatingArray.push(i);
    }

    const commentTextChangeHandler = (newCommentText: string) => {
        setCommentText(newCommentText);
    }

    const addComment = (commentText: string) => {
        if (loggedInUser) {
            let newComment: Comment = {
                date: new Date(),
                emailOfPublisher: loggedInUser.email,
                usernameOfPublisher: loggedInUser.username,
                comment: commentText
            }

            DatabaseHandler.addNewComment(postInfo.id, newComment);
            setCommentText("");
        }
    }

    const addLike = (postId: string, emailOfLiker: string) => {
        console.log(postId);
        console.log(emailOfLiker);
        DatabaseHandler.addNewLike(postId, emailOfLiker);
    }

    const toggleShowInteraction = () => {
        setShowInteraction(!showInteraction);
    }

    const visitProfile = (userId: string) => {
        currentlyVisitedUserProfileUpdate(userId);
        history.push('/profile');
    }

    const showToggleInteraction = location.pathname === '/discover' || location.pathname === '/profile';
    const showDeleteButton = !showToggleInteraction && userCanDeleteThisPost && postInfo && location.pathname === '/home';

    return loggedInUser ? <PostCardView 
        postCardInfo = {postInfo} 
        addComment = {addComment}
        addLike = {addLike}
        commentTextChangeHandler = {commentTextChangeHandler}
        commentText = {commentText}
        filledRatingArray = {filledRatingArray}
        nonFilledRatingArray = {nonFilledRatingArray}
        loggedInUserEmail = {loggedInUser.email}
        showInteraction = {showInteraction}
        visitProfile = {visitProfile}
        toggleShowInteraction = {toggleShowInteraction}
        showToggleInteraction = {showToggleInteraction}
        showDeleteButton = {showDeleteButton}
    /> : null;
}

export default PostCardPresenter;