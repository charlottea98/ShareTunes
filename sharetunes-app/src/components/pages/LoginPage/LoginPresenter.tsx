
import React, { ReactNode,useEffect, useState } from 'react';
import LoginView from './LoginView';
import SignUpView from './SignUpView';
import firebase from 'firebase';
import fire from "../../../fire";

import { Post, Song, User } from '../../../utility/types';
import { createImageLinkFromDriveId } from '../../../utility/utility';
import { addNewUser } from '../../../utility/firestoreCommunication';

import { useLoggedInUser, useLoggedInUserUpdate } from '../../../contexts/LoggedInUserContext';
import { useHistory } from 'react-router';


interface Props {
}


const LoginPresenter: React.FC<Props> = () => {
    const [user, setUser] = useState<string | firebase.User>('');             // const [user, setUser] = useState<string | firebase.User>('');
    const [email, setEmail] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');

    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [hasAccount, setHasAccount] = useState<boolean>(true);

    const [name, setName] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');

    const history = useHistory();
    const updateLoggedInUser = useLoggedInUserUpdate();


    const clearAll = () => {

        clearInputs();
        clearErrors();

    }

    const clearInputs = () => {
        setEmail('');
        setPassword1('');
        setPassword2('');
        setName('');
        setUsername('');
    };

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
        setUsernameError('');
        setNameError('');
    };

    const handleLogin = () => {
        clearErrors();
        fire.auth()
            .signInWithEmailAndPassword(email, password1)
            .then(() => {

                // Uppdatera mer här ? 
                updateLoggedInUser(email);
                history.push('/discover');
              })
            .catch((err) => {
                switch (err.code) {
                    case 'auth/invalid-email':
                    case 'auth/user-disabled':
                    case 'auth/user-not-found':
                        setEmailError(err.message);
                        break;
                    case 'auth/wrong-password':
                        setPasswordError(err.message);
                        break;
                }
            })
    };


    const confirmSignUp = () => {
        clearErrors();
        if (password1 == password2 && name.trim().length && username.trim().length){
            handleSignup();
        }
        else if(password1 != password2){

            setPasswordError("Passwords do not match")
        }
        else if(!name.trim().length){


            setNameError("You have to fill in your name")
        }
        else if(!username.trim().length){

            setUsernameError("You have to fill in a username")
        }


    }
    const handleSignup = () => {
        fire.auth()
            .createUserWithEmailAndPassword(email, password1)
            .then(() => {

                updateLoggedInUser(email);
                createUserInDataBase();
                history.push('/discover');
              })
            .catch((err) => {
                switch (err.code) {
                    case 'auth/email-already-in-use':
                    case 'auth/invalid-email':
                        setEmailError(err.message);
                        break;
                    case 'auth/weak-password':
                        setPasswordError(err.message);
                        break;
                }
            });
    };


    const authListener = () => {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                clearInputs();
                setUser(user);
            } else {
                setUser('')
            }
        });
    };

    useEffect(() => {
        authListener();
     }, []);

    

    const createUserInDataBase = () => {
        
        // Ny rasmus 
        let userToAdd : User = {
        id: email,
        name: name,
        email: email,
        username: username,
        profilePictureURL: createImageLinkFromDriveId("1pYIMKBLGubCmw78RAxDDhbm98PyOlY6Y"),
        favoriteSong: "4aaEV6V9aOQb2oQzWlf9cu",
        biography: "",
        posts: []
        }
        addNewUser(userToAdd);
           
        // // Lägg till i followers
        // firebase.firestore().collection('followers').doc(email).set({
        //     followers: [email]
       
        // })

        // //Lägg till i following
        // firebase.firestore().collection('following').doc(email).set({
        //     following: [email]
        // })


        // // Lägg till i users,  gammal, mail redan i database funkar redan här 
        // firebase.firestore().collection('users').doc(email).set({
        //     id:email,
        //     name: name,
        //     username: username,
        //     email: email,
        //     profilePictureURL:'',
        //     favouriteSong:'7723JnKU2R15Iv4T7OJrly',
        //     favouriteArtist:'',
        //     posts:[''],
        //     biography:''
        //   }) 

    }

    const checkUsername = () => {
        // Ser ifall userName redan finns i databasen ? Kanske onödigt krångligt , strunta i den här? 
    }


    if(hasAccount){
        
        return (
            <LoginView    
                clearAll = {clearAll}
                hasAccount = {hasAccount}
                setHasAccount = {setHasAccount}
                email = {email} 
                setEmail = {setEmail}
                emailError = {emailError}
                password1 = {password1}
                setPassword1 = {setPassword1} 
                passwordError = {passwordError} 
                handleLogin = {handleLogin}  
            />
        )
    }

    else{

        return (

            <SignUpView    
                clearAll = {clearAll}
                hasAccount = {hasAccount}
                setHasAccount = {setHasAccount}
        
                email = {email} 
                setEmail = {setEmail}
                emailError = {emailError}
            
                password1 = {password1}
                password2 = {password2}
                setPassword1 = {setPassword1} 
                setPassword2 = {setPassword2}
                passwordError = {passwordError} 
            
                name = {name}
                setName = {setName}
                nameError = {nameError}

                username = {username}
                setUsername = {setUsername}
                usernameError = {usernameError}

                confirmSignup = {confirmSignUp}
            />
        )

    }
    
}

export default LoginPresenter;

