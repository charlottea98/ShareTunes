import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrentAudioFile = createContext<string>('');
const CurrentAudioFileUpdate = createContext<Function>((audiofile:string) => "");
const IsPlaying = createContext<boolean>(false);
const CurrentAudio = createContext<any>(null);
const CurrentAudioUpdate = createContext<Function>((audiofile:string) => "");


export const useCurrentAudioFile = () => {
    return useContext(CurrentAudioFile);
}

export const useCurrentAudioFileUpdate = () => {
    return useContext(CurrentAudioFileUpdate);
}

export const useCurrentAudio = () => {
    return useContext(CurrentAudio);
}

export const useCurrentAudioUpdate = () => {
    return useContext(CurrentAudioUpdate);
}

export const useIsPlaying = () => {
    return useContext(IsPlaying);
}

const AudioContextProvider: React.FC = ({ children }) => {

    const [currentAudio, setCurrentAudio] = useState<HTMLMediaElement>();
    const [currentAudioFile, setCurrentAudioFile] = useState<string>('');
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const handleAudioFile = async (audiofile:string) => {
        setCurrentAudioFile(audiofile);
    }

    const handleAudio = (audio:HTMLMediaElement) => {
        setCurrentAudio(audio);
    }

    // const handlePlay = () => {
    //     currentAudio?.addEventListener("ended", () => setIsPlaying(false));
    //     currentAudio?.play();
    // }

    // const handlePause = () => {
    //     currentAudio?.pause();
    // }

    return (
        <>
        <CurrentAudioFile.Provider value={currentAudioFile}>
            <CurrentAudioFileUpdate.Provider value={handleAudioFile}>
                <CurrentAudio.Provider value={currentAudio}>
                    <CurrentAudioUpdate.Provider value={handleAudio}>
                        {children}
                    </CurrentAudioUpdate.Provider>
                </CurrentAudio.Provider>
            </CurrentAudioFileUpdate.Provider>
        </CurrentAudioFile.Provider>
        </>
    )
}

export default AudioContextProvider;