import React from 'react';
import classes from './editProfileView.module.scss';

import SongCardPresenter from "../../../common/SongCard/SongCardPresenter"
import { DEFAULT_PROFILE_PICTURE_URL } from '../../../../utility/utility';


import UserImagePresenter from "../../../common/UserImage/UserImagePresenter"

// Använd antingen placeholder eller value i inputsen.

// Vad ska hända när man klickar på change song ? Ska vi ha nånting liknande som i post istället? 

// Ändra i UserImagePresenter så att den kan ta in ett imageURL som ett prop istället och en bool ifall man ska kunna klicka eller inte 


import ChangeButton from "../../../common/buttons/TextButton/textButton"

interface Props {
    user:any
    history:any
    handleUpdate:(user:any) => void

    profilePictureURL: string
    setProfilePictureURL:(profilePictureURL: any) => void
    name: string
    setName: (name: string) => void
    username: string
    setUsername: (name: string) => void
    biography:string
    setBiography: (name: string) => void
    favoriteSong:string
    setFavoriteSong: (name: string) => void
  
}


const EditProfileView: React.FC<Props> = ({
    user,
    history,
    handleUpdate,
    name,
    setName, 
    username,
    setUsername,
    profilePictureURL,
    setProfilePictureURL,
    biography,
    setBiography,
    favoriteSong,
    setFavoriteSong,
}) => {
    return (
        
        <div className={classes.EditProfileView}>
            <h2 className = {classes.pageTitle}>Profile Settings</h2>
            <div className = {classes.editContainer}>

                <div className = {classes.image}>
                    <UserImagePresenter  diameter = "100px" isActive = {true} /> 
                </div>
                
                <div className = {classes.form}>

                    <label  className = {classes.formText}>Profile picture URL</label>
                    <input type='text' autoFocus = {true} placeholder = {profilePictureURL}  onChange={e=>setProfilePictureURL(e.target.value)}></input>

                    <label  className = {classes.formText}>Name</label>
                    <input type='text' autoFocus = {true} placeholder = {name}  onChange={e=>setName(e.target.value)}></input>


                    <label  className = {classes.formText}>Username</label>
                    <input type='text' autoFocus = {true} placeholder = {username}  onChange={e=>setUsername(e.target.value)}></input>

                    <label  className = {classes.formText}>Biography</label>
                    <input type='text' className = {classes.biography} autoFocus = {true} placeholder = {biography}  onChange={e=>setBiography(e.target.value)}></input>
                    
                    <label  className = {classes.formText}>Favorite song</label>
                    <SongCardPresenter songId = {favoriteSong}  /> 

               </div>
               
               <ChangeButton text="Change favorite song" onButtonClick={() => { history.push('/profile');}}/>
                <div className = {classes.saveCancel}>
                    <div className={classes.cancelButton} onClick={()=>history.push('/profile')}>Cancel</div>
                    <div className={classes.saveButton} onClick={()=>handleUpdate(user)}>Save</div>
                </div>
               

            </div>



        </div>

       
    );
};

export default EditProfileView;
