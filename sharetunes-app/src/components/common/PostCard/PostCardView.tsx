import React, { useState } from 'react';
import { Post } from '../../../utility/types';
import classes from './postCard.module.scss';

import { useCurrentlyVisitedUserProfileUpdate } from '../../../contexts/CurrentlyVisitedUserProfileContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faComments as farFaComments } from '@fortawesome/free-regular-svg-icons';
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';

import SongCard from '../SongCard/SongCardPresenter';
import DeletePostButtonPresenter from './DeletePost/DeletePostButtonPresenter';
import { useHistory } from 'react-router';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';

import { Comment } from '../../../utility/types';
import { DatabaseHandler } from '../../../utility/databaseHandler';

interface Props {
    postCardInfo: Post | undefined,
    userCanDeletePost: boolean
}

const PostCardView: React.FC<Props> = ({
    postCardInfo,
    userCanDeletePost
}) => {
    const [commentText, setCommentText] = useState<string>("");

    const history = useHistory();
    const currentlyVisitedUserProfileUpdate = useCurrentlyVisitedUserProfileUpdate()
    const loggedInUser = useLoggedInUser()


    let filledRatingArray = [];
    let nonFilledRatingArray = [];

    if (postCardInfo) {
        for (let i = 0; i < postCardInfo.rating; i++) {
            filledRatingArray.push(i);
        }

        for (let i = postCardInfo.rating; i < 5; i++) {
            nonFilledRatingArray.push(i);
        }
    }

    const publishCommentClick = () => {
        if (postCardInfo && loggedInUser) {

            let newComment: Comment = {
                date: new Date(),
                emailOfPublisher: loggedInUser.email,
                usernameOfPublisher: loggedInUser.username,
                comment: commentText
            }

            DatabaseHandler.addNewComment(postCardInfo.id, newComment);
        }
    }

    return loggedInUser && postCardInfo ? (
        <div className={classes.PostCardHome}>
            
            <div className={classes.layer1}>
                <div className={classes.publisherInfoContainer}>
                    <img src={postCardInfo.profilePictureOfPublisher} />
                    {postCardInfo.usernameOfPublisher}
                </div>
                {
                    userCanDeletePost && postCardInfo 
                        ? <DeletePostButtonPresenter postId={postCardInfo.id} /> 
                        : <div />
                }  
            </div>
            <div
                className={classes.postImage}
                style={{
                    "backgroundImage": `url(${postCardInfo.postImageURL})`
                }}
            />
            <SongCard song = {postCardInfo.song} />

            <div className={classes.reviewContainer}>
                <div className={classes.ratingContainer}>
                    {
                        filledRatingArray.map(() => (
                            <div>
                                <FontAwesomeIcon icon={faMusic} color="#FEC46E" />
                            </div>
                        ))
                    }
                    {
                        nonFilledRatingArray.map(() => (
                            <div>
                                <FontAwesomeIcon icon={faMusic} color="#FEC46E" opacity="0.25" />
                            </div>
                        ))
                    }
                </div>
                <div className={classes.tagsContainer}>
                    {
                        postCardInfo.tags.map(tag => (
                            <div className={classes.tag}>{tag}</div>
                        ))
                    }
                </div>
            </div>

            <div className={classes.interactionContainer}>
                <div className={classes.likeAndCommentContainer}>
                    <div
                        style={{
                            "color": postCardInfo.likes.includes(loggedInUser.email) ? "#fec46e" : "#232323"
                        }}
                        onClick={() => DatabaseHandler.addNewLike(postCardInfo.id, loggedInUser.email)}
                    >
                        <FontAwesomeIcon icon={postCardInfo.likes.includes(loggedInUser.email) ? faHeart : farFaHeart} />
                    </div>
                    <div><FontAwesomeIcon icon={farFaComments} /></div>
                </div>
                <div className={classes.numberOfLikes}>{postCardInfo.likes.length} likes</div>

                <div className={classes.captionAndComments}>
                    <div>
                        <span 
                            className={classes.userNameInComment}
                            onClick = {() => {
                                currentlyVisitedUserProfileUpdate(postCardInfo.emailOfPublisher);
                                history.push('/profile');
                            }}
                        >
                            {postCardInfo.usernameOfPublisher}
                        </span>
                        {postCardInfo.caption}
                    </div>

                    {postCardInfo.comments.map(comment => (
                        <div>
                        <span className={classes.userNameInComment}>{comment.usernameOfPublisher}</span>
                        {comment.comment}
                    </div>
                    ))}
                </div>                
            </div>

            <div className={classes.commentBox}>
                <input 
                    type="text"
                    placeholder="Write comment"
                    value = {commentText}
                    onChange = {event => setCommentText(event.target.value)}
                />

                <div onClick={() => {
                    publishCommentClick();
                    setCommentText("")
                }}>Publish</div>
            </div>
        </div>
    ) : null;
}

export default PostCardView;