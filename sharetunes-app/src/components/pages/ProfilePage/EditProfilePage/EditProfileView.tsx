import React from 'react';
import classes from './editProfileView.module.scss';

import SongCardPresenter from "../../../common/SongCard/SongCardPresenter"
import { DEFAULT_PROFILE_PICTURE_URL } from '../../../../utility/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlusCircle} from '@fortawesome/free-solid-svg-icons';

import ImageUploader from '../../../common/FileUploader/ImageUploaderPresenter';
import UserImagePresenter from "../../../common/UserImage/UserImagePresenter"

// Använd antingen placeholder eller value i inputsen?

// Vilka error meddelanden vill vi ha ? 
// egentligen bara profileImage URL som kan bli fel. Hur ska designen vara på error? (relevant i post också)

// Ändra i UserImagePresenter så att den kan ta in ett imageURL som ett prop istället och en bool ifall man ska kunna klicka eller inte 
// så slipper vi kodupprepa när Rasmus redan gjort en komponent.

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

    isSearching:boolean
    switchSearchMode: Function
    searchSong: Function
    handleChange:Function
    searchInput: string
    postSongId: string
    handlePostPictureChange: (imageURL: string) => void
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
    isSearching,
    switchSearchMode,
    handleChange,
    searchSong,
    searchInput,
    postSongId,
    handlePostPictureChange
}) => {
    return (
        
        <div className={classes.EditProfileView}>
            <div className = {classes.pageTitle}>Profile Settings</div>
            <div className = {classes.editContainer}>

                <div className = {classes.image}>
                    <UserImagePresenter  diameter = "100px" isActive = {true} /> 
                </div>
                
                <div className = {classes.form}>
                    <label className = {classes.formText}>Profile picture</label>
                    <ImageUploader onFileChange={handlePostPictureChange} imageCategory="users" height="264px" />

                    <label  className = {classes.formText}>Name</label>
                    <input type='text' autoFocus = {true} placeholder = {name}  onChange={e=>setName(e.target.value)}></input>

                    <label  className = {classes.formText}>Username</label>
                    <input type='text' autoFocus = {true} placeholder = {username}  onChange={e=>setUsername(e.target.value)}></input>

                    <label  className = {classes.formText}>Biography</label>
                    <textarea className = {classes.biography} autoFocus = {true} placeholder = {biography}  onChange={e=>setBiography(e.target.value)}></textarea>
                    
                    <label  className = {classes.formText}>Favorite song</label>

                    {isSearching?(
                    <div>
                        <SongCardPresenter songId = {postSongId == '' ? favoriteSong:postSongId} />
                        <ChangeButton text="Change favorite song" onButtonClick={() => { switchSearchMode();}}/>
                    </div>
                    ):(
                    <div className={classes.searchSongContainer}>
                        <input onChange={e => {handleChange(e,'song');}}/>
                        <div className={classes.searchSongIcon} onClick={() => searchSong(searchInput)}>
                            <FontAwesomeIcon icon={faSearch} size='1x'/>
                        </div>
                    </div>
                    )}
    
               </div>

               <div className = {classes.saveCancel}>
                    <div className={classes.cancelButton} onClick={()=>history.push('/profile')}>Cancel</div>
                    <div className={classes.saveButton} onClick={()=>handleUpdate(user)}>Save</div>
               </div>  
               
            </div>
        </div>

       
    );
};

export default EditProfileView;

