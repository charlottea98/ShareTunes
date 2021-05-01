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
    const [topSongs, setTopSongs] = useState<any[]>([]);
    const [recommendedSongs, setRecommendedSongs] = useState<any[]>([])
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentAudio, setCurrentAudio] = useState<HTMLMediaElement>();
    const [currentAudioFile, setCurrentAudioFile] = useState<string>('');

    const getSpotifyPopularPlaylist = () => {
        let request = require('request'); // "Request" library

        // your application requests authorization
        let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
            },
            form: {
                grant_type: 'client_credentials'
            },
            json: true
        };

        request.post(authOptions, (error : any, response: any, body: any) => {
            if (!error && response.statusCode === 200) {

                // use the access token to access the Spotify Web API
                let token = body.access_token;
                let options = {
                url: `https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF`,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true
                };
                request.get(options, function(error : any, response: any, body: any) {
                    
                    let tracks = body?.tracks?.items;
                    let topTracks = [];
                    let countValidTracks = 0;

                    if (tracks !== undefined) {
                        for (var i=0; countValidTracks < 5; i++) {
                            const trackInfo:any = {artist: tracks[i]?.track.artists[0].name,
                                                title: tracks[i]?.track.name,
                                                albumCoverSmall: tracks[i]?.track.album.images[2].url,
                                                preview: tracks[i]?.track.preview_url
                                                };
                            if (trackInfo.preview){
                                topTracks.push(trackInfo);
                                countValidTracks++;
                            }
                        }
                        setTopSongs(topTracks);
                    }
                });
            }
        });

        request.post(authOptions, (error : any, response: any, body: any) => {
            if (!error && response.statusCode === 200) {

                // use the access token to access the Spotify Web API
                let token = body.access_token;
                let options = {
                url: `https://api.spotify.com/v1/playlists/37i9dQZF1DXcecv7ESbOPu`,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true
                };
                request.get(options, function(error : any, response: any, body: any) {
                    
                    let tracks = body?.tracks?.items;
                    let recommendedTracks = [];
                    let countValidTracks = 0;

                    if (tracks !== undefined) {
                        for (var i=0; countValidTracks < 5; i++) {
                            const trackInfo:any = {artist: tracks[i]?.track.artists[0].name,
                                                title: tracks[i]?.track.name,
                                                albumCoverSmall: tracks[i]?.track.album.images[2].url,
                                                preview: tracks[i]?.track.preview_url
                                                };
                            if (trackInfo.preview){
                                recommendedTracks.push(trackInfo);
                                countValidTracks++;
                            }
                        }
                        setRecommendedSongs(recommendedTracks);
                    }
                });
            }
        });
    }


    useEffect(() => {
        getSpotifyPopularPlaylist();
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

    return (
        <div className={classes.DiscoverPage}>
            <DiscoverPageView user={loggedInUser} posts={posts} handleAudio={handleAudio} isPlaying={isPlayingCurrentFile} topSongs={topSongs} recommendedSongs={recommendedSongs}/>
        </div>
    )
}

export default DiscoverPage;