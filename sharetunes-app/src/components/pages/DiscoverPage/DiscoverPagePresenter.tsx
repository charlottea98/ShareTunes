import React, { useEffect, useState } from 'react';
import { useLoggedInUser, useLoggedInUserUpdate } from '../../../contexts/LoggedInUserContext';
import LogoutButton from '../../common/buttons/LogoutButton/LogoutButton';
import firestore from '../../../firestore';
import { SpotifyAPI } from '../../../utility/spotifyCommunication';

import classes from './discoverPage.module.scss';
import DiscoverPageView from './DiscoverPageView';

const DiscoverPage : React.FC = () => {
    const loggedInUser = useLoggedInUser();
    const [posts, setPosts] = useState<any[]>([]);
    const [topSongs, setTopSongs] = useState<string[]>([]);
    const [recommendedSongs, setRecommendedSongs] = useState<string[]>([])
    const [viewPost, setViewPost] = useState<boolean>(false);

    const getSpotifyPopularPlaylist = () => {
        SpotifyAPI.getPlaylistDetails('37i9dQZEVXbMDoHDwVN2tF').then(body => {
            let tracks = body?.tracks?.items;
            let topTracks = [];
            let countValidTracks = 0;

            if (tracks !== undefined) {
                for (var i = 0; countValidTracks < 5; i++) {
                    const trackInfo: any = {
                        artist: tracks[i]?.track.artists[0].name,
                        title: tracks[i]?.track.name,
                        albumCoverSmall:
                            tracks[i]?.track.album.images[2].url,
                        preview: tracks[i]?.track.preview_url,
                    };
                    if (trackInfo.preview) {
                        topTracks.push(trackInfo);
                        countValidTracks++;
                    }
                }
                setTopSongs(topTracks);
            }
        });

        SpotifyAPI.getPlaylistDetails('37i9dQZF1DXcecv7ESbOPu').then(body => {
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
        })
    };

    useEffect(() => {
        getSpotifyPopularPlaylist();
        setPosts([]);
        firestore.collection('posts').get().then(snapshot => {
            snapshot.docs.map(doc => {
                setPosts(oldArray => [...oldArray, doc.data()]);
            });
        })
    }, []);

    return (
        <div className={classes.DiscoverPage}>
            <DiscoverPageView user={loggedInUser} 
                            posts={posts} 
                            topSongs={topSongs} 
                            recommendedSongs={recommendedSongs}
            />
            <LogoutButton/>
        </div>
    )
}

export default DiscoverPage;