import React from 'react';
import { PostCardInfo } from '../../../utility/types';
import classes from './postCard.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faComments as farFaComments } from '@fortawesome/free-regular-svg-icons';
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';

import SongCard from '../SongCard/SongCardPresenter';
import DeletePostButtonPresenter from './DeletePost/DeletePostButtonPresenter';

interface Props {
    postCardInfo: PostCardInfo | undefined,
    currentLoggedInUserLikesPost: boolean,
    likeButtonClickHandler: () => void,
    userCanDeletePost: boolean,
    deletePost: Function
}

const PostCardHomeView: React.FC<Props> = ({
    postCardInfo,
    currentLoggedInUserLikesPost,
    likeButtonClickHandler,
    userCanDeletePost,
    deletePost
}) => {
    const day = postCardInfo?.date.toDate().getDay() + 1;
    const month = postCardInfo?.date.toDate().getMonth() + 1;
    const year = postCardInfo?.date.toDate().getFullYear();

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

    return (
        <div className={classes.PostCardHome}>
            <div className={classes.layer1}>
                <div className={classes.publisherInfoContainer}>
                    <img src={postCardInfo?.profilePictureOfPublisher} />
                    {postCardInfo?.usernameOfPublisher}
                </div>
                {
                    userCanDeletePost && postCardInfo 
                        ? <DeletePostButtonPresenter postId={postCardInfo.id} deletePost={deletePost} /> 
                        : <div />
                }
                
                    
                {/* TODO: (1) Ska bara synas för post-ägaren (2) När man trycker på knapparna ska man kunna radera posten */}
            </div>
            <div
                className={classes.postImage}
                style={{
                    "backgroundImage": `url(${postCardInfo?.postImageURL})`
                }}
            />
            <SongCard
                title={postCardInfo?.songTitle}
                artists={postCardInfo?.artists[0]}
                albumCover={postCardInfo?.albumCover}
                previewSong={postCardInfo?.previewSong}
            />

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
                        postCardInfo?.tags.map(tag => (
                            <div className={classes.tag}>{tag}</div>
                        ))
                    }
                </div>
            </div>

            <div className={classes.interactionContainer}>
                <div className={classes.likeAndCommentContainer}>
                    <div
                        style={{
                            "color": currentLoggedInUserLikesPost ? "#fec46e" : "#232323"
                        }}
                        onClick={likeButtonClickHandler}
                    >
                        <FontAwesomeIcon icon={currentLoggedInUserLikesPost ? faHeart : farFaHeart} />
                    </div>
                    <div><FontAwesomeIcon icon={farFaComments} /></div>
                </div>
                <div className={classes.numberOfLikes}>{postCardInfo?.likes} likes</div>

                <div className={classes.captionAndComments}>
                    <div> {/*TODO: När man trycker på användare ska man tas till dennes profil */}
                        <span className={classes.userNameInComment}>{postCardInfo?.usernameOfPublisher}</span>
                        {postCardInfo?.caption}
                    </div>

                    <div>
                        <span className={classes.userNameInComment}>johanlam</span>
                        Cool bild!⭐
                    </div>

                    <div>
                        <span className={classes.userNameInComment}>isakpet</span>
                        Niiiice låt🎵
                    </div>

                    {/* {postCardInfo?.comments.map(comment => (
                        <div>
                        <span className={classes.userNameInComment}>{comment.postedBy}</span>
                        {comment.comment}
                    </div>
                    ))} */}
                </div>
            </div>
        </div>
    )
}

export default PostCardHomeView;