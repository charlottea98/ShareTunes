
import React, {useRef,useEffect,useState } from 'react';
import { updateUser } from '../../../../utility/firestoreCommunication';
import { Post, Song, User } from '../../../../utility/types';

import EditProfileView from './EditProfileView';

import {
    useLoggedInUser,
    useLoggedInUserUpdate,
} from '../../../../contexts/LoggedInUserContext';


const EditProfilePresenter: React.FC = () => {
    
    const [username, setUsername] = useState<string>('');
    const user = useLoggedInUser();


    useEffect(() => {
        if(user ){
            setUsername(user.username)
            console.log(user.username) 
            }
      }, [user?.id,user?.profilePictureURL,user?.name,user?.username,user?.biography]); // maybe add some more? favouritesong etc



    const handleUpdate = () => {
        let newUserInfo: User;
        
        if(user != null){
            newUserInfo = user
            newUserInfo.username = username
            updateUser(user);
        }
        
    
    }


    return (<EditProfileView 
        username={username}
        user ={user}
        handleUpdate= {handleUpdate}
        setUsername = {setUsername}
        />
    )
    
};

export default EditProfilePresenter;

