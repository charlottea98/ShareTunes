import React from 'react';
import classes from './songCard.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMusic,
    faUsers,
    faPlay,
    faPause,
} from '@fortawesome/free-solid-svg-icons';
import { Artist } from '../../../utility/types';
import '../../../Resources/images/nomusic.svg';

interface Props {
    title: string;
    artists: Array<Artist>;
    albumCover: string;
    previewSong: string | null;
    handleAudio: Function;
    isPlaying: Function;
}

const SongCardView: React.FC<Props> = ({
    title,
    artists,
    albumCover,
    previewSong,
    handleAudio,
    isPlaying,
}) => {
    return (
        <div className={classes.SongCard}>
            <div className={classes.albumCoverAndSongInfoContainer}>
                <div className={classes.albumImageContainer}>
                    <img src={albumCover} alt="" />
                </div>
                <div className={classes.SongInfoContainer}>
                    <div className={classes.SongTitleContainer}>
                        <FontAwesomeIcon
                            icon={faMusic}
                            color="#232323"
                            size="1x"
                        />
                        <span>{title}</span>
                    </div>

                    <div className={classes.SongArtistsContainer}>
                        <FontAwesomeIcon
                            icon={faUsers}
                            color="#232323"
                            size="1x"
                        />
                        <div>
                            {artists.map((artist, idx) => (
                                <span
                                    className={classes.artistContainer}
                                    key={idx}
                                >
                                    {artist.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {previewSong ? (
                <div
                    className={classes.playButtonContainer}
                    onClick={() => {
                        handleAudio(previewSong);
                    }}
                >
                    <FontAwesomeIcon
                        icon={isPlaying(previewSong) ? faPause : faPlay}
                        color="#fff"
                        size="2x"
                    />
                </div>
            ) : (
                <div className={classes.dontButtonContainer}>
                    <div className={classes.dontButtonContainerIcon}></div>
                </div>
            )}
        </div>
    );
};

export default SongCardView;
