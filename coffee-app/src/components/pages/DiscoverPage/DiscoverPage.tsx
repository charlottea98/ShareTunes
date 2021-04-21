import React, { useState } from 'react';
import { useLoggedInUser, useLoggedInUserUpdate } from '../../../contexts/LoggedInUserContext';
import PrimaryButton from '../../common/buttons/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../common/buttons/SecondaryButton/secondaryButton';
import LogoutButton from '../../common/buttons/LogoutButton/LogoutButton';
import Searchbar from './Searchbar';

import classes from './discoverPage.module.scss';


const DiscoverPage : React.FC = () => {
    const loggedInUser = useLoggedInUser();
    const updateLoggedInUser = useLoggedInUserUpdate();
    const [searchText, setSearchText] = useState("");
    const [searchResult, setSearchResult] = useState("");
    const getSpotifySong = () => {
        let request = require('request'); // "Request" library

        let client_id = 'c9e9c34181c846e2bf3d591af1b4ea52'; // Your client id
        let client_secret = '92ac3ab6d2c646d3ab5c71d9ea5068fb'; // Your secret

        // your application requests authorization
        let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
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
                url: `https://api.spotify.com/v1/search?q=${searchText}&type=track`,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true
                };
                request.get(options, function(error : any, response: any, body: any) {
                    console.log(body);
                    let tracks = body?.tracks?.items;
                    
                    if (tracks !== undefined) {
                        let displayTracks = tracks.map((track: any) => (
                            <div>
                                {track.name}
                            </div>
                        ))
    
                        setSearchResult(displayTracks);
                    }
                });
            }
        });
    }

    return (
        <div className={classes.HomePage}>
            <Searchbar></Searchbar>
            <PrimaryButton 
                text = "Change to user 0"
                onButtonClick = {() => updateLoggedInUser('rrudling@kth.se')}
                buttonColor = 'green'
            />
            <SecondaryButton
                text = "Change to user 1"
                onButtonClick = {() => updateLoggedInUser('johanlam@kth.se')}
                buttonColor = 'black'
            />
            <strong>
                { loggedInUser?.email } <br />
                { loggedInUser?.favoriteSong.title } <br />
                { loggedInUser?.name }
            </strong>

            <div>
                <input 
                    type="text"
                    name="name"
                    onChange = {e => setSearchText(e.target.value)} 
                />
                {searchText}
                <PrimaryButton 
                    text="Search for song"
                    onButtonClick = {getSpotifySong}
                />

                Search result:
                {searchResult}
            </div>

            <LogoutButton></LogoutButton>
        </div>
    )
}

export default DiscoverPage;