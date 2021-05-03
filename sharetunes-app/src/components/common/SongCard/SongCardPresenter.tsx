import React from 'react';
import SongCardView from './SongCardView';

interface Props {
    title?: string,
    artists?: string,
    albumCover?: string
}

const SongCardPresenter: React.FC<Props> = ({title, artists, albumCover}) => {
    
    let songCard;

    if (title && artists && albumCover) {
        songCard = <SongCardView 
            title = {title}
            artists = {artists}
            albumCover = {albumCover}
        />;
    } else {
        songCard = null;
    }

    return songCard;
}

export default SongCardPresenter;