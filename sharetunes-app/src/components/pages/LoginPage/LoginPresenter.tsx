import React, { ReactNode,useEffect, useState } from 'react';
import LoginView from './LoginView';
import firebase from 'firebase';
import fire from "../../../fire";
import { useLoggedInUser, useLoggedInUserUpdate } from '../../../contexts/LoggedInUserContext';
import { useHistory } from 'react-router';



interface Props {
}

// Gör en refactor på den här koden om du har tid , kanske göra ett objekt med userInformation istället eller linkande.
// Blir för mkt variabler/funktioner just nu 

const LoginPresenter: React.FC<Props> = () => {


    const [user, setUser] = useState<string | firebase.User>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [hasAccount, setHasAccount] = useState<boolean>(false);


    const [username, setUsername] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [firstNameError, setFirstNameError] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [lastNameError, setLastNameError] = useState<string>('');

    const history = useHistory();
    const updateLoggedInUser = useLoggedInUserUpdate();

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    };

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    };

    const handleLogin = () => {
        clearErrors();
        fire.auth()
            .signInWithEmailAndPassword(email, password)
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

    const handleSignup = () => {
        clearErrors();
        fire.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                updateLoggedInUser(email);
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


    // Hur får man det här att fungera med MVC ?? 
    const authListener = () => {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                clearInputs();
                setUser(user);
            } else {
                setUser('');
            }
        });
    };

    useEffect(() => {
        authListener();
    }, []);
    
    
    // Den här funktionen lägget till en user i firestore databasen med mail som id och värden ( mail, username)
    const createUserInDataBase = () => {
        

        // Lägg till i users
        firebase.firestore().collection('users').doc(email).set({
            firstName: firstName,
            lastName: lastName,
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
        
        hasAccount = {hasAccount}
        setHasAccount = {setHasAccount}

        email = {email} 
        setEmail = {setEmail}
        emailError = {emailError}
    
        password = {password}
        setPassword = {setPassword} 
        passwordError = {passwordError} 
    
        firstName = {firstName}
        setFirstName = {setFirstName}
        firstNameError = {firstNameError}
    
        lastName = {lastName}
        setLastName = {setLastName}
        lastNameError = {lastNameError} 
    
        username = {username}
        setUsername = {setUsername}
        usernameError = {usernameError}

        handleLogin = {handleLogin}
        handleSignup = {handleSignup}
        createUserInDataBase = {createUserInDataBase}    
        checkUserName = {checkUsername}   
            
        />
    )
}

export default LoginPresenter;

