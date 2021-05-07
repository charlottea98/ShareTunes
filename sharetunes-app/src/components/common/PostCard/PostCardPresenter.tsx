import React, {  useState } from 'react';

import PostCardView from './PostCardView';
import PostCardDiscoverView from './PostCardDiscoveryView';
import { Post, Comment } from '../../../utility/types';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';
import { DatabaseHandler } from '../../../utility/databaseHandler';
import { stringify } from 'node:querystring';

interface Props {
    postInfo: Post
}

const PostCardPresenter : React.FC<Props> = ({postInfo}) => {
    const [commentText, setCommentText] = useState<string>("");
    const loggedInUser = useLoggedInUser();

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

    return loggedInUser ? <PostCardView 
        postCardInfo = {postInfo} 
        userCanDeletePost = {userCanDeleteThisPost}
        addComment = {addComment}
        addLike = {addLike}
        commentTextChangeHandler = {commentTextChangeHandler}
        commentText = {commentText}
        filledRatingArray = {filledRatingArray}
        nonFilledRatingArray = {nonFilledRatingArray}
        loggedInUserEmail = {loggedInUser.email}
    /> : null;
}

export default PostCardPresenter;