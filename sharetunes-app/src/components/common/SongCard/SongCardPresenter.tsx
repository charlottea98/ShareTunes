import React, { useState, useEffect } from 'react';
import SongCardView from './SongCardView';
import { Song } from '../../../utility/types';
import { useDatabase } from '../../../contexts/DatabaseContext';

interface Props {
    songId: string
}

const SongCardPresenter: React.FC<Props> = ({songId}) => {
    const { songs } = useDatabase();
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentAudio, setCurrentAudio] = useState<HTMLMediaElement>();
    const [currentAudioFile, setCurrentAudioFile] = useState<string>('');

    let song = songs.filter(song => song.id === songId)[0];

    let songCard;

    useEffect(() => {
        if (isPlaying){
            handlePlay();
        }
        else{
            handlePause();
        }
    }, [isPlaying])


    const handleAudio = (audiofile:string) => {
        if (currentAudioFile===''){
            var audio = new Audio(audiofile);
            setCurrentAudio(audio);
            setCurrentAudioFile(audiofile);
        }
        else if (currentAudioFile!==audiofile && currentAudio){
            handlePause();
            currentAudio.currentTime=0;
            var audio = new Audio(audiofile);
            setCurrentAudio(audio);
            setCurrentAudioFile(audiofile);
        }
        else{
            setCurrentAudio(currentAudio);
        }
        setIsPlaying(!isPlaying);
    }

    const handlePlay = () => {
        currentAudio?.addEventListener("ended", () => setIsPlaying(false));
        currentAudio?.play();
    }

    const handlePause = () => {
        currentAudio?.pause();
    }

    const isPlayingCurrentFile = (audiofile:string) => {
        if (isPlaying && audiofile===currentAudioFile){
            return true;
        }
        return false;
    }

    if (song?.title && song?.artists && song?.albumCoverURL) {
        songCard = <SongCardView 
            title = {song.title}
            artists = {song.artists}
            albumCover = {song.albumCoverURL}
            previewSong = {song.previewURL}
            handleAudio={handleAudio} 
            isPlaying={isPlayingCurrentFile}
        />;
    } else {
        songCard = null;
    }

    return songCard;
}

export default SongCardPresenter;