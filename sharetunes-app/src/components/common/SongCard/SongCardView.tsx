import React from 'react';
import classes from './songCard.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faUsers, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

interface Props {
    title: string,
    artists: string,
    albumCover: string,
    isPlayingSong: boolean,
    playPauseButtonClickedHandler: () => void
}

const SongCardView: React.FC<Props> = ({
    title, 
    artists,
    albumCover, 
    isPlayingSong, 
    playPauseButtonClickedHandler
}) => {
    return (
        <div className={classes.SongCard}>
            <div className={classes.albumCoverAndSongInfoContainer}>
                <img src={albumCover} />

                <div className={classes.SongInfoContainer}>
                    <div className={classes.SongTitleContainer}>
                        <FontAwesomeIcon icon={faMusic} color="#232323" size="1x" />
                        <span>{title}</span>
                    </div>

                    <div className={classes.SongArtistsContainer}>
                        <FontAwesomeIcon icon={faUsers} color="#232323" size="1x" />
                        <span>{artists}</span>
                    </div>
                </div>
            </div>

            <div 
                className={classes.playButtonContainer}
                onClick = {playPauseButtonClickedHandler}
            >
                <FontAwesomeIcon icon={isPlayingSong ? faPlay : faPause} color="#fff" size="2x" />
            </div>
        </div>
    )
}

export default SongCardView;