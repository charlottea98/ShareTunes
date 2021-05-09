
import React, {useRef,useEffect,useState } from 'react';
import { Post, Song, User } from '../../../../utility/types';
import { DatabaseHandler } from '../../../../utility/databaseHandler';

import EditProfileView from './EditProfileView';
import { useHistory } from 'react-router';
import {
    useLoggedInUser,
    useLoggedInUserUpdate,
} from '../../../../contexts/LoggedInUserContext';


const EditProfilePresenter: React.FC = () => {
    
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [profilePictureURL,setProfilePictureURL] = useState<any>('');     // Fungerade inte med string här ? 
    const [biography, setBiography] = useState<string>('');
    const [favoriteSong, setFavoriteSong] = useState<any>('');

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
        
        if(user != null){
            newUserInfo = user
            newUserInfo.profilePictureURL = profilePictureURL
            newUserInfo.name = name
            newUserInfo.username = username
            newUserInfo.biography = biography
            newUserInfo.favoriteSong = favoriteSong
            
            DatabaseHandler.updateUserInfo(user);
        }

        history.push('/profile');
        
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
        setFavoriteSong = {setFavoriteSong}
    

        />
    )
    
};

export default EditProfilePresenter;

