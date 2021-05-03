import React, { useState } from 'react';
import SongCardView from './SongCardView';

interface Props {
    title?: string,
    artists?: string,
    albumCover?: string
}

const SongCardPresenter: React.FC<Props> = ({title, artists, albumCover}) => {
    const [isPlayingSong, setIsPlayingSong] = useState<boolean>(false);
    let songCard;

    const playPauseButtonClickedHandler = () => {
        setIsPlayingSong(!isPlayingSong);
    }

    if (title && artists && albumCover) {
        songCard = <SongCardView 
            title = {title}
            artists = {artists}
            albumCover = {albumCover}
            isPlayingSong = {isPlayingSong}
            playPauseButtonClickedHandler = {playPauseButtonClickedHandler}
        />;
    } else {
        songCard = null;
    }

    return songCard;
}

export default SongCardPresenter;