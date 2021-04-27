import React, { ReactNode,useEffect, useState } from 'react';
import LogInButton from '../../common/buttons/SecondaryButton/secondaryButton';
import firebase from 'firebase';
import fire from "../../../fire";
import classes from './loginPage.module.scss';
import { useLoggedInUser, useLoggedInUserUpdate } from '../../../contexts/LoggedInUserContext';
import { useHistory } from 'react-router';


interface Props {
    user : ReactNode;
    setUser : any;
}

const LoginPage : React.FC<Props> = ({user, setUser}) => {
    
    //const [user, setUser] = useState<string | firebase.User>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [hasAccount, setHasAccount] = useState<boolean>(false);

    /////////////////////////////

    // Dom här är nya, behöver dom vara useStates eller kan man göra på något enklare sätt? 
    const [username, setUsername] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [firstNameError, setFirstNameError] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [lastNameError, setLastNameError] = useState<string>('');

    //////////////////////////////
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
        // checkUsername(); 
        firebase.firestore().collection('users').doc(email).set({
            first_name: firstName,
            last_name: lastName,
            userName: username,
            email: email,
          })
    }

    const checkUsername = () => {
        // Ser ifall userName redan finns i databasen ? Kanske onödigt krångligt , strunta i den här? 
    }
    
    return (
        <div className={classes.LoginPage}>
        <section className='login'>
                <div className={classes.center}>
                    {hasAccount ? (
                        <>
                        <div className='loginContainer'>
                            <label>Mail</label>
                            <input type='text' 
                            autoFocus required value={email} 
                            onChange={e=>setEmail(e.target.value)}>
                            </input>
                            <p>{emailError}</p>
                            <label>Password</label>
                            <input type="password" required value={password}
                            onChange={(e) => {setPassword(e.target.value)}}>
                            </input>
                            <p>{passwordError}</p>
                        </div>
                        <LogInButton text="Sign in" onButtonClick={handleLogin}/>
                        <p>Don't have an account? <button onClick={() => setHasAccount(!hasAccount)}>Sign up</button></p>
                        </>
                    ) : (
                            // För mkt kodupprepning, har bara följt mönstret på de andra , osäker om error behövs? 
                        <>
                         <div className='loginContainer'>
                            <label>First name</label>
                            <input type='text' 
                            autoFocus required value={firstName} 
                            onChange={e=>setFirstName(e.target.value)}>
                            </input>
                            <p>{firstNameError}</p>

                            <label>Last name</label>
                            <input type='text' 
                            autoFocus required value={lastName} 
                            onChange={e=>setLastName(e.target.value)}>
                            </input>
                            <p>{lastNameError}</p>

                            <label>Username</label>
                            <input type='text' 
                            autoFocus required value={username} 
                            onChange={e=>setUsername(e.target.value)}>
                            </input>
                            <p>{usernameError}</p>

                            <label>Mail</label>
                            <input type='text' 
                            autoFocus required value={email} 
                            onChange={e=>setEmail(e.target.value)}>
                            </input>
                            <p>{emailError}</p>

                            <label>Password</label>
                            <input type="password" required value={password}
                            onChange={(e) => {setPassword(e.target.value)}}>
                            </input>
                            <p>{passwordError}</p>

                        </div>

                        <LogInButton text="Sign up" onButtonClick={() => { handleSignup(); createUserInDataBase();}}/>
                        
                        <p>Have an account? <button onClick={() => setHasAccount(!hasAccount)}>Sign in</button></p>
                        </>
                    )}
                
            </div>
        </section>
        </div>
    )
}

export default LoginPage;
