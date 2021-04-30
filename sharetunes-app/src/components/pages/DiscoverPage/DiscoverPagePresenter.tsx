import React, { useEffect, useState } from 'react';
import { useLoggedInUser, useLoggedInUserUpdate } from '../../../contexts/LoggedInUserContext';
import PrimaryButton from '../../common/buttons/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../common/buttons/SecondaryButton/secondaryButton';
import LogoutButton from '../../common/buttons/LogoutButton/LogoutButton';
import Searchbar from './Searchbar';
import firestore from '../../../firestore';
import firebase from 'firebase/app';

import classes from './discoverPage.module.scss';

import { CLIENT_ID, CLIENT_SECRET } from '../../../utility/keys';

import DiscoverPageView from './DiscoverPageView';

const DiscoverPage : React.FC = () => {
    const loggedInUser = useLoggedInUser();
    const [posts, setPosts] = useState<any[]>([]);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentAudio, setCurrentAudio] = useState<HTMLMediaElement>();
    const [currentAudioFile, setCurrentAudioFile] = useState<string>('');

    useEffect(() => {
        setPosts([]);
        firestore.collection('posts').get().then(snapshot => {
            snapshot.docs.map(doc => {
                setPosts(oldArray => [...oldArray, doc.data()]);
            });
        })
    }, []);

    useEffect(() => {
        if (isPlaying){
            handlePlay();
        }
        else{
            handlePause();
        }
    }, [isPlaying])


    const handleAudio = (audiofile:string) => {
        if (currentAudioFile==='' || currentAudioFile!==audiofile){
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

    return (
        <div className={classes.DiscoverPage}>
            <DiscoverPageView user={loggedInUser} posts={posts} handleAudio={handleAudio} isPlaying={isPlayingCurrentFile}/>
        </div>
    )
}

export default DiscoverPage;