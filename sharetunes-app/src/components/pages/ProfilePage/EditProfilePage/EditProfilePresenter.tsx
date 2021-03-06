import React, { useEffect, useState } from 'react';
import { User } from '../../../../utility/types';
import { DatabaseHandler } from '../../../../utility/databaseHandler';

import EditProfileView from './EditProfileView';
import { useHistory } from 'react-router';
import { useLoggedInUser } from '../../../../contexts/LoggedInUserContext';

import { SpotifyAPI } from '../../../../utility/spotifyHandler';
import { useCurrentAudio } from '../../../../contexts/AudioContext';

const EditProfilePresenter: React.FC = () => {
    const user = useLoggedInUser();
    const history = useHistory();

    const currentAudio = useCurrentAudio();

    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [profilePictureURL, setProfilePictureURL] = useState<any>(''); // Fungerade inte med string här ?
    const [biography, setBiography] = useState<string>('');
    const [favoriteSong, setFavoriteSong] = useState<any>('');

    const [postSongId, setPostSongId] = useState<string>(
        user?.favoriteSong ? user.favoriteSong : ''
    );
    const [searchInput, setSearchInput] = useState<string>('');
    const [isSearching, setIsSearching] = useState<boolean>(postSongId !== '');

    // Lottas nya sökfunktion
    const [typing, setTyping] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [showSongCardStart, setShowSongCardStart] = useState<boolean>(true);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setUsername(user.username);
            setProfilePictureURL(user.profilePictureURL);
            setBiography(user.biography);
            setFavoriteSong(user.favoriteSong);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        user?.id,
        user?.profilePictureURL,
        user?.name,
        user?.username,
        user?.biography,
        user?.favoriteSong,
    ]);

    const handleUpdate = () => {
        let newUserInfo: User;

        if (user !== null) {
            newUserInfo = user;
            newUserInfo.profilePictureURL = profilePictureURL;
            newUserInfo.name = name;
            newUserInfo.username = username;
            newUserInfo.biography = biography;

            if (postSongId !== '') newUserInfo.favoriteSong = postSongId;

            DatabaseHandler.updateUserInfo(user);
        }

        history.push('/profile');
    };

    const handleTypeSearch = (value: string) => {
        setSearchResults([]);
        SpotifyAPI.getSongSearch(value).then((songInfo) => {
            let songs = songInfo?.tracks?.items;
            if (songs !== undefined) {
                songs = songs.map((song: any) => {
                    return {
                        id: song.id,
                        title: song.name,
                        albumImage: song.album.images[2].url,
                    };
                });
                setSearchResults(songs);
            }
        });
    };

    const handleChange = (e: any) => {
        let value = e.target.value;

        setSearchInput(value);
        setTyping(true);
        handleTypeSearch(value);
        setShowSongCardStart(false);
    };

    const switchSearchMode = () => {
        setIsSearching(!isSearching);
        if (isSearching) {
            setPostSongId('');
            setSearchResults([]);
            currentAudio?.pause();
        }
    };

    const searchSong = (id: string) => {
        setPostSongId(id);
        switchSearchMode();
        DatabaseHandler.addNewSong(id);
        setSearchInput('');
    };

    const handlePostPictureChange = (imageURL: string) => {
        setProfilePictureURL(imageURL);
    };

    // Lottas nya sökfunktion
    const handleClose = () => {
        setTyping(false);
        setSearchResults([]);
    };

    return (
        <EditProfileView
            user={user}
            handleUpdate={handleUpdate}
            history={history}
            profilePictureURL={profilePictureURL}
            setProfilePictureURL={setProfilePictureURL}
            name={name}
            setName={setName}
            username={username}
            setUsername={setUsername}
            biography={biography}
            setBiography={setBiography}
            favoriteSong={favoriteSong}
            isSearching={isSearching}
            switchSearchMode={switchSearchMode}
            searchSong={searchSong}
            handleChange={handleChange}
            searchInput={searchInput}
            postSongId={postSongId}
            handlePostPictureChange={handlePostPictureChange}
            handleClose={handleClose}
            typing={typing}
            searchResults={searchResults}
            showSongCardStart={showSongCardStart}
        />
    );
};

export default EditProfilePresenter;
