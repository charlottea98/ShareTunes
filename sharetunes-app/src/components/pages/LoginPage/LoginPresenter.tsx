
import React, { ReactNode,useEffect, useState } from 'react';
import LoginView from './LoginView';
import firebase from 'firebase';
import fire from "../../../fire";

//import addNewUser from "../../../utility/firestoreCommunication"

import { useLoggedInUser, useLoggedInUserUpdate } from '../../../contexts/LoggedInUserContext';
import { useHistory } from 'react-router';
import { addNewUser } from '../../../utility/firestoreCommunication';


// Ändra i creatUserinDatabase() här för att använda nya utility funktionerna firestoreCommunication.ts istället
// Sätt till empty strings eller tom array


// Ändra firstName och lastName till name 
// Lägg in krav på name och username 

// Ändra LoginView till SignupView och LoginView
// Ändra mellan dem i loginPresenter 

// Ändra bakgrund på loginComponent till vit 

interface Props {
}



const LoginPresenter: React.FC<Props> = () => {
    const [user, setUser] = useState<string | firebase.User>('');             // const [user, setUser] = useState<string | firebase.User>('');
    const [email, setEmail] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');

    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [hasAccount, setHasAccount] = useState<boolean>(false);


    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');


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
    };

    const handleLogin = () => {
        clearErrors();
        fire.auth()
            .signInWithEmailAndPassword(email, password1)
            .then(() => {
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


    const confirmPasswordSignUp = () => {
        clearErrors();
        if (password1 == password2){
            handleSignup();
        }
        else{

            setPasswordError("Passwords do not match")
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

            }
        });
    };

    useEffect(() => {
        authListener();
     }, []);

    
    // Den här funktionen lägget till en user i firestore databasen med mail som id och värden ( mail, username)

    // Ändre det här för att använda nya utility funktionerna
    const createUserInDataBase = () => {
    
        // Lägg till i users
        firebase.firestore().collection('users').doc(email).set({
            name: name,
            userName: username,
            email: email,
          })
        
        // Lägg till i followers
        firebase.firestore().collection('followers').doc(email).set({
            followers: [email]
       
        })

        //Lägg till i following
        firebase.firestore().collection('following').doc(email).set({
            following: [email]
        })
    }

    const checkUsername = () => {
        // Ser ifall userName redan finns i databasen ? Kanske onödigt krångligt , strunta i den här? 
    }

    return (


        <LoginView    
        
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
      
    
        username = {username}
        setUsername = {setUsername}

        handleLogin = {handleLogin}
        confirmPasswordSignup = {confirmPasswordSignUp}  

            
        />
    )
}

export default LoginPresenter;

