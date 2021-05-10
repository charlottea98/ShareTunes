
import React, {useRef,useEffect,useState } from 'react';
import { Post, Song, User } from '../../../../utility/types';
import { DatabaseHandler } from '../../../../utility/databaseHandler';

import EditProfileView from './EditProfileView';
import { useHistory } from 'react-router';
import {
    useLoggedInUser,
    useLoggedInUserUpdate,
} from '../../../../contexts/LoggedInUserContext';

import { SpotifyAPI } from '../../../../utility/spotifyHandler';

const EditProfilePresenter: React.FC = () => {
    
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [profilePictureURL, setProfilePictureURL] = useState<any>('');     // Fungerade inte med string här ? 
    const [biography, setBiography] = useState<string>('');
    const [favoriteSong, setFavoriteSong] = useState<any>('');


    const [postSongId, setPostSongId] = useState<string>('');
    const [searchInput, setSearchInput] = useState<string>(' ');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isSearching, setIsSearching] = useState<boolean>(true);


    const user = useLoggedInUser();
    const history = useHistory();

    useEffect(() => {
        if(user ){
            setName(user.name)
            setUsername(user.username)
            setProfilePictureURL(user.profilePictureURL)
            setBiography(user.biography)
            setFavoriteSong(user.favoriteSong)
            }
      }, [user?.id,user?.profilePictureURL,user?.name,user?.username,user?.biography,user?.favoriteSong]); // maybe add some more? favouritesong etc


    const handleUpdate = () => {
        let newUserInfo: User;
        

        console.log(favoriteSong)
        if(user != null){
            newUserInfo = user
            newUserInfo.profilePictureURL = profilePictureURL
            newUserInfo.name = name
            newUserInfo.username = username
            newUserInfo.biography = biography

            if(postSongId != '')
                newUserInfo.favoriteSong = postSongId
            
            DatabaseHandler.updateUserInfo(user);
        }

        history.push('/profile');
        
    }

    const handleChange = (e:any,type:string) => {
        if (type==='error'){
            setErrorMessage(e);
        }
        else{
            var value = e.target.value;
            if (type==='song'){
                setSearchInput(value);
            }
        }

    }

    const switchSearchMode = () => {
        setIsSearching(!isSearching);
        if (isSearching){
            setPostSongId('');
        }
    }

    const searchSong = (searchString:string) => {
        SpotifyAPI.getSongSearch(searchString).then(songInfo=>{
            let song=songInfo?.tracks?.items[0];
            if (song===undefined){
                handleChange('Please type a song', 'error');
            }
            else{
                setErrorMessage('');
                let postSongId = song.id;
                setPostSongId(postSongId);
                switchSearchMode();
                DatabaseHandler.addNewSong(postSongId);
                setSearchInput('');
            }
        })    
    }

    const handlePostPictureChange = (imageURL: string) => {
        setProfilePictureURL(imageURL);
    }



    return (<EditProfileView 
        user ={user}
        handleUpdate= {handleUpdate}
        history = {history}
        
        profilePictureURL = {profilePictureURL}
        setProfilePictureURL = {setProfilePictureURL}
        name = {name}
        setName = {setName}
        username={username}
        setUsername = {setUsername}
        biography = {biography}
        setBiography = {setBiography}
        favoriteSong = {favoriteSong}
        isSearching = {isSearching}
        
        switchSearchMode = {switchSearchMode}
        searchSong = {searchSong}
        handleChange = {handleChange}
        searchInput = {searchInput}
        postSongId= {postSongId}
        handlePostPictureChange = {handlePostPictureChange}
        />
    )
    
};

export default EditProfilePresenter;

