import React from 'react';
import { PostCardInfo } from '../../../utility/types';
import classes from './postCard.module.scss';

import ThreeDotsButton from '../../common/buttons/ThreeDotsButton/ThreeDotsButtonPresenter';
import SongCard from '../SongCard/SongCardPresenter';

interface Props {
    postCardInfo: PostCardInfo | undefined
}

const PostCardHomeView : React.FC<Props> = ({postCardInfo}) => {
    const day = postCardInfo?.date.toDate().getDay() + 1;
    const month = postCardInfo?.date.toDate().getMonth() + 1;
    const year = postCardInfo?.date.toDate().getFullYear();

    return (
        <div className={classes.PostCardHome}>
            <div className={classes.layer1}>
                <div className={classes.publisherInfoContainer}>
                    <img src={postCardInfo?.profilePictureOfPublisher} />
                    {postCardInfo?.usernameOfPublisher}
                </div>
                <ThreeDotsButton 
                    size = "M"
                />
            </div>
            <div 
                className={classes.postImage}
                style = {{
                    "backgroundImage": `url(${postCardInfo?.postImageURL})`
                }}
            />
            <SongCard
                title = {postCardInfo?.songTitle}
                artists = {postCardInfo?.artists[0]}
                albumCover = {postCardInfo?.albumCover}
            />

            Caption: {postCardInfo?.caption} <br />
            comments: {postCardInfo?.comments.map((comment, idx) => (
                <span 
                    style={{
                        "marginRight":"10px"
                    }}
                    key={idx}
                >
                    {comment}
                </span>)
            )} <br />

            {console.log(postCardInfo?.date.toDate())}
            date: {`${year}/${month}/${day}`} <br />
            likes: {postCardInfo?.likes} <br />

            rating: {postCardInfo?.rating} <br />
            song: {postCardInfo?.songTitle} <br />
            artists: {postCardInfo?.artists.map((artist, idx) => (
                <span 
                    style={{
                        "marginRight":"10px"
                    }}
                    key = {idx}
                >
                    {artist}
                </span>)
            )} <br />
            <img 
                src={postCardInfo?.albumCover}
                style = {{
                    "height": "150px"
                }}
            /> <br />
            tags: {postCardInfo?.tags.map((tag, idx) => (
                <span 
                    style={{
                        "marginRight":"10px"
                    }}
                    key = {idx}
                >
                    {tag}
                </span>)
            )} <br />
        </div>
    )
}

export default PostCardHomeView;