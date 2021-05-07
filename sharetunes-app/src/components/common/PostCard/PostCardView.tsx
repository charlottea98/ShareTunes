import React, { useState } from 'react';
import { Post } from '../../../utility/types';
import classes from './postCard.module.scss';

import { useLocation } from 'react-router-dom';

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


interface Props {
    postCardInfo: Post | undefined,
    userCanDeletePost: boolean,
    addComment: (commentText: string) => void,
    addLike: (postId: string, emailOfLiker: string) => void,
    commentTextChangeHandler: (newCommentText: string) => void,
    commentText: string,
    filledRatingArray: Array<number>,
    nonFilledRatingArray: Array<number>,
    loggedInUserEmail: string
}

const PostCardView: React.FC<Props> = ({
    postCardInfo,
    userCanDeletePost,
    addComment,
    addLike,
    commentTextChangeHandler,
    commentText,
    filledRatingArray,
    nonFilledRatingArray,
    loggedInUserEmail
}) => {
    const history = useHistory();
    const location = useLocation();
    
    
    const [showInteraction, setShowInteraction] = useState<boolean>(location.pathname === '/home');
    
    const currentlyVisitedUserProfileUpdate = useCurrentlyVisitedUserProfileUpdate();


    return postCardInfo ? (
        <div className={classes.PostCardHome}>
            
            <div className={classes.layer1}>
                <div className={classes.publisherInfoContainer}>
                    <img src={postCardInfo.profilePictureOfPublisher} />
                    {postCardInfo.usernameOfPublisher}
                </div>
                {
                    userCanDeletePost && postCardInfo && location.pathname === '/home'
                        ? <DeletePostButtonPresenter postId={postCardInfo.id} /> 
                        : (
                            <div className={classes.viewPost} onClick={() => setShowInteraction(!showInteraction)}>
                                {showInteraction ? (
                                    <p>Close post</p>
                                ):(
                                <p>View post</p>
                                )}
                            </div>
                        )
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
            
            <div style={{ "display": showInteraction ? "block" : "none"}}>
                <div className={classes.interactionContainer}>
                    <div className={classes.likeAndCommentContainer}>
                        <div
                            style={{
                                "color": postCardInfo.likes.includes(loggedInUserEmail) ? "#fec46e" : "#232323"
                            }}
                            onClick={() => addLike(postCardInfo.id, loggedInUserEmail)}
                        >
                            <FontAwesomeIcon icon={postCardInfo.likes.includes(loggedInUserEmail) ? faHeart : farFaHeart} />
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
                        onChange = {event => commentTextChangeHandler(event.target.value)}
                    />

                    <div onClick={() => addComment(commentText)}>Publish</div>
                </div>
            </div>
            
        </div>
    ) : null;
}

export default PostCardView;