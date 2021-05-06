import React, { useEffect, useState } from 'react';

import PostCardHomeView from './PostCardHomeView';
import PostCardDiscoverView from './PostCardDiscoveryView';
import { Post, PostCardInfo } from '../../../utility/types';
import { getUserInfo, getSongInfo } from '../../../utility/firestoreCommunication';
import { SpotifyAPI } from '../../../utility/spotifyCommunication';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';


interface Props {
    postInfo: Post,
    pageToViewOn: "home page" | "discovery page",
    deletePost?: Function
}

const PostCardPresenter : React.FC<Props> = ({pageToViewOn, postInfo, deletePost = () => {}}) => {
    const [postCardInfo, setPostCardInfo] = useState<PostCardInfo | undefined>(undefined);
    const [currentLoggedInUserLikesPost, setCurrentLoggedInUserLikesPost] = useState<boolean>(false);
    const [viewPost, setViewPost] = useState<boolean>(false);

    let postCardView;

    useEffect(() => {
        getUserInfo(postInfo.postedBy)
            .then(publisherInfo => {
                let infoAboutPublisher = {
                    profilePicture: publisherInfo?.profilePictureURL,
                    username: publisherInfo?.username
                };

                getSongInfo(postInfo.song)
                    .then(songInfo => {
                        if (songInfo) {
                            SpotifyAPI.getArtistDetails(songInfo.artists[0])
                            .then(artistInfo => {
                                let infoAboutSong = {
                                    title: songInfo?.title,
                                    artists: [artistInfo?.name],
                                    albumCover: songInfo?.albumCoverMediumURL,
                                    preview: songInfo?.songPreviewURL
                                }
                                setPostCardInfo({
                                    id: postInfo.id,
                                    caption: postInfo.caption,
                                    rating: postInfo.rating,
                                    tags: postInfo.tags,
                                    postImageURL: postInfo.postImageURL,
                                    songTitle: infoAboutSong.title, 
                                    artists: infoAboutSong.artists, 
                                    albumCover: infoAboutSong.albumCover,
                                    previewSong: infoAboutSong.preview,
                                    usernameOfPublisher: infoAboutPublisher.username,
                                    profilePictureOfPublisher: infoAboutPublisher.profilePicture,
                                    likes: postInfo.likes,
                                    comments: postInfo.comments,
                                    date: postInfo.date
                                })
                            })
                        }
                    })
            });
    }, []);

    const changeViewPost = () => {
        setViewPost(!viewPost);
    }
    
    const likeButtonClickHandler = () => {
        setCurrentLoggedInUserLikesPost(!currentLoggedInUserLikesPost);
    }

    const loggedInUser = useLoggedInUser();

    let userCanDeleteThisPost = false;

    if (loggedInUser && loggedInUser.username == postCardInfo?.usernameOfPublisher) {
        userCanDeleteThisPost = true;
    }

    if (pageToViewOn === 'home page') {
        postCardView = (
            <PostCardHomeView 
                postCardInfo = {postCardInfo} 
                currentLoggedInUserLikesPost = {currentLoggedInUserLikesPost}
                likeButtonClickHandler = {likeButtonClickHandler}
                userCanDeletePost = {userCanDeleteThisPost}
                deletePost = {deletePost}
            />
        );
    } else { // pageToViewOn === 'discovery page'
        postCardView = <PostCardDiscoverView postCardInfo={postCardInfo} 
            changeViewPost={changeViewPost}
            viewPost={viewPost}
            currentLoggedInUserLikesPost = {currentLoggedInUserLikesPost}
            likeButtonClickHandler = {likeButtonClickHandler}
        />;
    }

    return postCardView;
}

export default PostCardPresenter;