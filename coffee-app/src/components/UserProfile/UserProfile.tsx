import React, { useEffect, useState } from 'react';
import ProfileName from './ProfileName';
import ProfilePicture from './ProfilePicture';
import ProfileTitles from './ProfileTitles';
import ProfileTextField from './ProfileTextField';
import Spotify from 'spotify-web-api-js';

import classes from './userProfile.module.scss';

interface Props {}

const spotifyApi = new Spotify();

const UserProfile: React.FC<Props> = (props) => {
    const [tokens, setTokens] = useState<Object>({});
    const [searchData, setSearchData] = useState<Object>({});

    const getHashParams = () => {
        let hashParams: { [index: string]: any } = {};
        let e,
            r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ((e = r.exec(q))) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        console.log(hashParams);

        return hashParams;
    };

    useEffect(() => {
        setTokens(getHashParams()); // Lagra access- och refresh tokens i ett object för spotify
        const test = Object.keys(tokens)[0];
        console.log(test);

        const tokensArr = Object.values(tokens);
        const access_token = tokensArr[0];
        const refresh_token = tokensArr[1];

        spotifyApi.setAccessToken(access_token);

        console.log(tokensArr);

        spotifyApi.searchTracks('Love').then(
            function(data) {
                console.log('Search by "Love"', data);
                setSearchData(data);
            },
            function(err) {
                console.error(err);
            }
        );
    }, []);
    return (
        <div>
            <ProfileName name={'John Dog'} />
            <ProfilePicture
                source={
                    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.ivHy7rpHL0GyEA_mdcY5AAHaFj%26pid%3DApi&f=1'
                }
            />
            <ProfileTitles title={'About'} />
            <ProfileTextField />
            <ProfileTitles title={'Interests'} />
            <ProfileTextField />
            <ProfileTitles title={'Favorite Coffee'} />
            <ProfileTextField />
            <ProfileTitles title={'Gangster Puppy'} />
            <ProfileTextField searchObj={searchData} />
            <ProfileTitles title={'Party Puppy'} />
            <ProfileTextField />
        </div>
    );
};

export default UserProfile;
