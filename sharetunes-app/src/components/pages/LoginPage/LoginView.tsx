import React, { ReactNode,useEffect, useState } from 'react';

//import firebase from 'firebase';

import classes from './loginPage.module.scss';
import LogoPresenter from '../../common/Logo/LogoPresenter';
import SignInUpButton from '../../common/buttons/SignInUpButton/SignInUpButton'
import SwitchButton from '../../common/buttons/SwitchButton/SwitchButton'
import { isClassExpression } from 'typescript';

// Gör en refactor på den här koden om du har tid , kanske göra ett objekt med userInformation istället eller linkande.

// Fungerar inte bra just nu , måste göra om MCV implementation så att error handling etc fungerar som det ska , spara nya createUserInDatabase

// Bugg om man försöker create account med bara ett password 

// Send more data to the database , när en person signar upp så ska dom läggas in i follwers och following också och följer sig själva i listan
// ShareTunes button goes to homepage 

interface Props {
    

    hasAccount: boolean
    setHasAccount:(hasAccount:boolean) => void

    email: string
    setEmail:(email: string) => void
    emailError: string 

    password: string
    setPassword: (password: string) => void
    passwordError: string 

    firstName: string
    setFirstName: (firstName: string) => void
    firstNameError:string

    lastName:string 
    setLastName:(lastName: string) => void
    lastNameError: string 

    username: string
    setUsername: (setUsername: string) => void
    usernameError:string

    handleLogin:() => void
    handleSignup:() => void
    createUserInDataBase:() => void
    checkUserName:() => void
   

}


const LoginView : React.FC<Props> = (
    {
    
    hasAccount,
    setHasAccount,
    email,
    setEmail,
    emailError,
    password,
    setPassword,
    passwordError,
    firstName,
    setFirstName,
    firstNameError,
    lastName,
    setLastName,
    lastNameError,
    username,
    setUsername,
    usernameError,
    handleLogin,
    handleSignup,
    createUserInDataBase,
    checkUserName   }) => {



    return (
        <div className={classes.LoginPage}>
        <section>
                <div>
                    {hasAccount ? (
                        <>
                        
                        <div className= {[classes.loginContainer,classes.form].join(" ")}>

                            <LogoPresenter fontSize = {"40px"}/>

                            <div className = {classes.form}>

                                <label className = {classes.formText}>Mail</label>
                                <input type='text' 
                                autoFocus required value={email} 
                                onChange={e=>setEmail(e.target.value)} >
                                </input>
                                <p className = {classes.errorText}>{emailError}</p>
                                
                                
                                <label  className = {classes.formText}>Password</label>
                                <input type="password" required value={password}
                                onChange={(e) => {setPassword(e.target.value)}}>
                                </input>
                                <p  className = {classes.errorText}>{passwordError}</p>
                               

                            </div>
                           
                            <SignInUpButton text="Sign in" onButtonClick={() => { handleLogin(); createUserInDataBase();}}/>

                        </div>
                        
                        <SwitchButton text1 = "Don't have an account?" text2 = "Sign up" onButtonClick={() => {setHasAccount(!hasAccount)}}/>

                    
                        </>
                    ) : ( 
                        <>
                         <div className= {[classes.loginContainer, classes.form].join(" ")}>
                            <LogoPresenter fontSize = {"40px"}/>

                            <div className = {classes.form}>
                                <label  className = {classes.formText}>First name</label>
                                <input type='text' 
                                    autoFocus required value={firstName} 
                                    onChange={e=>setFirstName(e.target.value)}>
                                </input>
                                <p>{firstNameError}</p>

                                <label  className = {classes.formText}>Last name</label>
                                <input type='text' 
                                autoFocus required value={lastName} 
                                onChange={e=>setLastName(e.target.value)}>
                                </input>
                                <p>{lastNameError}</p>

                                <label  className = {classes.formText}>Username</label>
                                <input type='text' 
                                autoFocus required value={username} 
                                onChange={e=>setUsername(e.target.value)}>
                                </input>
                                <p>{usernameError}</p>

                                <label  className = {classes.formText}>Mail</label>
                                <input type='text' 
                                autoFocus required value={email} 
                                onChange={e=>setEmail(e.target.value)}>
                                </input>
                                <p className = {classes.errorText}>{emailError}</p>

                                <label  className = {classes.formText}>Password</label>
                                <input type="password" required value={password}
                                onChange={(e) => {setPassword(e.target.value)}}>
                                </input>
                                <p  className = {classes.errorText}>{passwordError}</p>
                            </div>

                            <SignInUpButton text="Create account" onButtonClick={() => { handleSignup(); createUserInDataBase();}}/>
                        </div>

                        
                        <SwitchButton text1 = "Have an account?" text2 = "Sign in" onButtonClick={() => {setHasAccount(!hasAccount)}}/>
    
                        </>
                    )}
                
            </div>
        </section>
        </div>
    )
}

export default LoginView;



//<LogInButton text="Sign up" onButtonClick={() => { handleSignup(); createUserInDataBase();}}/>
//<LogInButton text="Sign in" onButtonClick={handleLogin}/>

//<p>Have an account? <button text1 = {Have an account?} onButtonClick={() => setHasAccount(!hasAccount)}>Sign in</button></p>