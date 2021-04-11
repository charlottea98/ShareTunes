import React, {useEffect, useState} from 'react';
import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import TestHomePage from './components/LoginPage/TestHomePage';
import fire from './fire';
import firebase from "firebase/app";



const App : React.FC = () => {
    const [coffeeData, setCoffeeData] = useState<string | null>(null);

    useEffect(() => {
        fetch("https://my-json-server.typicode.com/charlottea98/CoffeeApp/coffees")
            .then(res => res.json())
            .then(data => {
                setCoffeeData(JSON.stringify(data));
            })

    });

    const [user, setUser] = useState<string | firebase.User >('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [hasAccount, setHasAccount] = useState<boolean>(false);
    

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    };

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }

    const handleLogin = () => {
        clearErrors();
        fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(err => {
            switch(err.code){
                case 'auth/invalid-email':
                case 'auth/user-disabled':
                case 'auth/user-notfound':
                    setEmailError(err.message);
                    break;
                case 'auth/wrong-password':
                    setPasswordError(err.message);
                    break;
            }
        });
    };

    const handleSignup = () => {
        clearErrors();
        fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(err => {
            switch(err.code){
                case 'auth/email-already-in-use':
                case 'auth/invalid-email':
                    setEmailError(err.message);
                    break;
                case 'auth/weak-password':
                    setPasswordError(err.message);
                    break;
            }
        });
    }

    const handleLogout = () => {
        fire.auth().signOut();
    }

    const authListener = () => {
        fire.auth().onAuthStateChanged((user) => {
            if(user){
                clearInputs();
                setUser(user);
            }
            else {
                setUser('');
            }
        });
    };

    useEffect(() => {
        authListener();
    }, []);

    const loginPageProps = {
        email: email,

    }

    return (
        <div className="App">
            {user ? (
                <TestHomePage handleLogout={handleLogout}></TestHomePage>
            ) : (
                <LoginPage email={email} setEmail={setEmail} password = {password} setPassword={setPassword}
            handleLogin={handleLogin} handleSignup={handleSignup} hasAccount={hasAccount}
            setHasAccount={setHasAccount} emailError={emailError} passwordError={passwordError}/>
            )}
        </div>
    );
}

export default App;
