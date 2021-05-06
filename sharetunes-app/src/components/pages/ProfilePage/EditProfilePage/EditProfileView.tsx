import React from 'react';
import classes from './editProfileView.module.scss';

//import SongCardPresenter from "../../../common/SongCard/SongCardPresenter"

import SignInUpButton from "../../../common/buttons/SignInUpButton/SignInUpButton"
interface Props {
    user:any
    username: string

    handleUpdate:(user:any) => void
    setUsername: (name: string) => void
 
}

const EditProfileView: React.FC<Props> = ({ username,user,handleUpdate,setUsername }) => {
    return (
        
        <div className={classes.EditProfileView}>
            <h1>Profile Settings</h1>
            <h2>Username</h2>
            <label  className = {classes.formText}>Username</label>
            <input type='text' autoFocus = {true} value = {username} onChange={e=>setUsername(e.target.value)}></input>

            <SignInUpButton text="Save" onButtonClick={() => {handleUpdate(user);}}/>

        </div>

       
    );
};

export default EditProfileView;



// <h2>Biography</h2>
// <label>Biography </label>
// <input type='text' autoFocus = {true} value = {user.biography}></input>

// <h2>My favorite song</h2>
// <p>{user.favoriteSong}</p>

// <button>Change favorite song</button>

// <button>Cancel</button>
// <button>Save</button>



/*{ <img
className={classes.profileImg}
src={user.profilePictureURL}
alt="Profile picture"
/>

<h2>Profile picture URL</h2>
<label  className = {classes.formText}>Profile picture URL </label>
<input type='text' autoFocus = {true} value = {user.profilePictureURL}></input>


<h2>Name</h2>
<label  className = {classes.formText}>Name </label>
<input type='text' autoFocus = {true} value = {user.name} onChange={e=>setName(e.target.value)></input> */