import React, { useEffect, useState } from 'react';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';
import { SpotifyAPI } from '../../../utility/spotifyHandler';
import { DatabaseHandler } from '../../../utility/databaseHandler';

import classes from './discoverPage.module.scss';
import DiscoverPageView from './DiscoverPageView';
import { useDatabase } from '../../../contexts/DatabaseContext';
import { ProgressLoader } from '../../common/ProgressLoader/ProgressLoader';
import { Post } from '../../../utility/types';
import { useCurrentAudio } from '../../../contexts/AudioContext';

const DiscoverPage: React.FC = () => {
    const loggedInUser = useLoggedInUser();
    const [loading, setLoading] = useState<boolean>(true);
    const { posts } = useDatabase();
    const [topSongs, setTopSongs] = useState<string[]>([]);
    const [recommendedSongs, setRecommendedSongs] = useState<string[]>([]);
    const [postsToUse, setPostsToUse] = useState<Array<Post>>([]);

    const currentAudio = useCurrentAudio();

    const getSpotifyPopularPlaylist = () => {
        SpotifyAPI.getPlaylistDetails('37i9dQZEVXbMDoHDwVN2tF').then((body) => {
            let tracks = body?.tracks?.items;
            let topTracks = [];
            let countValidTracks = 0;

            if (tracks !== undefined) {
                for (var i = 0; countValidTracks < 5; i++) {
                    if (tracks[i]?.track.preview_url) {
                        topTracks.push(tracks[i]?.track.id);
                        DatabaseHandler.addNewSong(tracks[i]?.track.id);
                        countValidTracks++;
                    }
                }
                setTopSongs(topTracks);
            }
        });

        SpotifyAPI.getPlaylistDetails('37i9dQZF1DXcecv7ESbOPu').then((body) => {
            let tracks = body?.tracks?.items;
            let recommendedTracks = [];
            let countValidTracks = 0;

            if (tracks !== undefined) {
                for (var i = 0; countValidTracks < 5; i++) {
                    if (tracks[i]?.track.preview_url) {
                        recommendedTracks.push(tracks[i]?.track.id);
                        DatabaseHandler.addNewSong(tracks[i]?.track.id);
                        countValidTracks++;
                    }
                }
                setRecommendedSongs(recommendedTracks);
            }
        });
    };

    useEffect(() => {
        let postIds = Object.keys(posts);
        let postsToUseTemp = postIds.map((postId) => posts[postId]);
        postsToUseTemp.sort(function(a, b) {
            return b.likes.length - a.likes.length;
        });
        postsToUseTemp = postsToUseTemp.filter((post: Post) => !post.deleted);

        setPostsToUse(postsToUseTemp);

        setLoading(false);
    }, [posts]);

    useEffect(() => {
        getSpotifyPopularPlaylist();
        currentAudio?.pause();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return (
            <div className={classes.loader}>
                <ProgressLoader></ProgressLoader>
            </div>
        );
    } else {
        return (
            <div className={classes.DiscoverPage}>
                <DiscoverPageView
                    user={loggedInUser}
                    posts={postsToUse}
                    topSongs={topSongs}
                    recommendedSongs={recommendedSongs}
                ></DiscoverPageView>
            </div>
        );
    }
};

export default DiscoverPage;
