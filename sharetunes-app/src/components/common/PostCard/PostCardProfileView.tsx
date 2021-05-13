import React from 'react';
import { Post } from '../../../utility/types';
import classes from './postCard.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';

import SongCard from '../SongCard/SongCardPresenter';
import DeletePostButtonPresenter from './DeletePostAndComment/DeletePost/DeletePostButtonPresenter';
import DeleteCommentButtonPresenter from './DeletePostAndComment/DeleteComment/DeleteCommentButtonPresenter';

interface Props {
    postCardInfo: Post | undefined;
    commentText: string;
    filledRatingArray: Array<number>;
    nonFilledRatingArray: Array<number>;
    loggedInUserEmail: string;
    showInteraction: boolean;
    showToggleInteraction: boolean;
    showDeleteButton: boolean;
    addComment: (commentText: string) => void;
    addLike: (postId: string, emailOfLiker: string) => void;
    commentTextChangeHandler: (newCommentText: string) => void;
    toggleShowInteraction: () => void;
    visitProfile: (userToVisit: string) => void;
}

const PostCardView: React.FC<Props> = ({
    postCardInfo,
    showDeleteButton,
    commentText,
    filledRatingArray,
    nonFilledRatingArray,
    loggedInUserEmail,
    showInteraction,
    addComment,
    addLike,
    commentTextChangeHandler,
    toggleShowInteraction,
    visitProfile,
}) => {
    return postCardInfo ? (
        <div className={classes.PostCardProfile}>
            <div className={classes.layer1}>
                <div className={classes.publisherInfoContainer}>
                    <div
                        className={classes.viewPost}
                        onClick={toggleShowInteraction}
                    >
                        {showInteraction ? <p>Close post</p> : <p>View post</p>}
                    </div>
                </div>
                {showDeleteButton 
                    ? <DeletePostButtonPresenter postId={postCardInfo.id} />
                    : null
                }
            </div>
            <div
                className={classes.postImage}
                style={{
                    backgroundImage: `url(${postCardInfo.postImageURL})`,
                }}
            />
            <SongCard songId={postCardInfo.songId} />

            <div className={classes.reviewContainer}>
                <div className={classes.ratingContainer}>
                    {filledRatingArray.map((el: any, idx: number) => (
                        <div key={idx}>
                            <FontAwesomeIcon icon={faMusic} color="#FEC46E" />
                        </div>
                    ))}
                    {nonFilledRatingArray.map((el: any, idx: number) => (
                        <div key={idx}>
                            <FontAwesomeIcon
                                icon={faMusic}
                                color="#FEC46E"
                                opacity="0.25"
                            />
                        </div>
                    ))}
                </div>
                <div className={classes.tagsContainer}>
                    {postCardInfo.tags.map((tag, idx) => (
                        <div className={classes.tag} key={idx}>
                            {tag}
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: showInteraction ? 'block' : 'none' }}>
                <div className={classes.interactionContainer}>
                    <div className={classes.likeAndCommentContainer}>
                        <div
                            style={{
                                color: postCardInfo.likes.includes(
                                    loggedInUserEmail
                                )
                                    ? '#fec46e'
                                    : '#232323',
                            }}
                            onClick={() =>
                                addLike(postCardInfo.id, loggedInUserEmail)
                            }
                        >
                            <FontAwesomeIcon
                                icon={
                                    postCardInfo.likes.includes(
                                        loggedInUserEmail
                                    )
                                        ? faHeart
                                        : farFaHeart
                                }
                                size="1x"
                            />
                        </div>
                        {/* <div><FontAwesomeIcon icon={farFaComments} /></div> */}
                    </div>
                    <div className={classes.numberOfLikes}>
                        {postCardInfo.likes.length}{' '}
                        {postCardInfo.likes.length === 1 ? 'like' : 'likes'}
                    </div>

                    <div className={classes.captionAndComments}>
                        <div>
                            <span className={classes.userNameInComment}>
                                <strong
                                    onClick={() =>
                                        visitProfile(
                                            postCardInfo.emailOfPublisher
                                        )
                                    }
                                >
                                    {postCardInfo.usernameOfPublisher}
                                </strong>
                                {postCardInfo.caption}
                            </span>
                        </div>

                        {postCardInfo.comments.map((comment, idx) => (
                            <div className={classes.commentContainer} key={idx}>
                                <span className={classes.userNameInComment}>
                                    <strong
                                        onClick={() =>
                                            visitProfile(
                                                comment.emailOfPublisher
                                            )
                                        }
                                    >
                                        {comment.usernameOfPublisher}
                                    </strong>
                                    {comment.comment}
                                </span>
                                
                                
                                {loggedInUserEmail === comment.emailOfPublisher ? (
                                    <div className={classes.deleteComment}>
                                        <DeleteCommentButtonPresenter
                                            postId={postCardInfo.id}
                                            commentId={comment.id}
                                            comment={comment.comment}
                                        />
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={classes.commentBox}>
                    <input
                        type="text"
                        placeholder="Write comment"
                        value={commentText}
                        onChange={(event) =>
                            commentTextChangeHandler(event.target.value)
                        }
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                addComment(commentText);
                            }
                        }}
                    />

                    <div
                        onClick={() => addComment(commentText)}
                        className={
                            commentText === ''
                                ? classes.inActivePublishComment
                                : classes.publishComment
                        }
                    >
                        Publish
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default PostCardView;
