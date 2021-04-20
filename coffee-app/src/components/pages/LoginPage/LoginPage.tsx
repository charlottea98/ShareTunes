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
                //alert('inloggad ');
                // här vill vi routa till själva hemsidan
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
    
    
    return (
        <div className={classes.LoginPage}>
        <section className='login'>
            <div className='loginContainer'>
                <label>
                    Username
                </label>
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
                <div className={classes.center}>
                    {hasAccount ? (
                        <>
                        <LogInButton text="Sign in" onButtonClick={handleLogin}/>
                        <p>Don't have an account? <button onClick={() => setHasAccount(!hasAccount)}>Sign up</button></p>
                        </>
                    ) : (
                        <>
                        <LogInButton text="Sign up" onButtonClick={handleSignup}/>
                        <p>Have an account? <button onClick={() => setHasAccount(!hasAccount)}>Sign in</button></p>
                        </>
                    )}
                </div>
            </div>
        </section>
        </div>
    )
}

export default LoginPage;