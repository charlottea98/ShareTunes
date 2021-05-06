import React, { ReactNode,useEffect, useState } from 'react';

//import firebase from 'firebase';

import classes from './loginPage.module.scss';
import LogoPresenter from '../../common/Logo/LogoPresenter';
import SignInUpButton from '../../common/buttons/SignInUpButton/SignInUpButton'
import SwitchButton from '../../common/buttons/SwitchButton/SwitchButton'


interface Props {
    
    clearAll: () => void
    hasAccount: boolean
    setHasAccount:(hasAccount:boolean) => void

    email: string
    setEmail:(email: string) => void
    emailError: string 

    password1: string
    setPassword1: (password1: string) => void
    password2: string
    setPassword2: (password2: string) => void
    passwordError: string 

    name: string
    setName: (name: string) => void
    nameError: string 

    username: string
    setUsername: (setUsername: string) => void
    usernameError: string
    
    confirmSignup: () => void
   

}


const LoginView : React.FC<Props> = ({
    clearAll,
    hasAccount,
    setHasAccount,
    email,
    setEmail,
    emailError,
    password1,
    password2,
    setPassword1,
    setPassword2,
    passwordError,
    name,
    setName,
    nameError,
    username,
    setUsername,
    usernameError,
    confirmSignup,
    }
    
    ) => {

        
    return (
        <div className={classes.LoginPage}>
        <section>
                <>
                <div className= {[classes.loginContainer, classes.form].join(" ")}>
                <LogoPresenter fontSize = {"40px"}/>

                <div className = {classes.form}>
                    <label  className = {classes.formText}>Name </label>
                    <input type='text' autoFocus = {true} required value={name} onChange={e=>setName(e.target.value)}></input>
                    <p className = {classes.errorText}>{nameError}</p>
                
                    <label  className = {classes.formText}>Username</label>
                    <input type='text' required value={username} onChange={e=>setUsername(e.target.value)}></input>
                    <p className = {classes.errorText}>{usernameError}</p>

                    <label  className = {classes.formText}>Mail</label>
                    <input type='text' required value={email} onChange={e=>setEmail(e.target.value)}></input>
                    <p className = {classes.errorText}>{emailError}</p>

                    <label  className = {classes.formText}>Password</label>
                    <input type="password" required value={password1} onChange={(e) => {setPassword1(e.target.value)}}></input>
                    <p  className = {classes.errorText}>{passwordError}</p>

                    <label  className = {classes.formText}>Confirm Password</label>
                    <input type="password" required value={password2} onChange={(e) => {setPassword2(e.target.value)}}></input> 

                </div>

                <SignInUpButton text="Create account" onButtonClick={() => {confirmSignup();}}/>
            
            </div>
            <SwitchButton  text1 = "Have an account?" text2 = "Sign in" onButtonClick={() => {clearAll();setHasAccount(!hasAccount)}}/>
                
            </>
       
        </section>
        </div>
    )
}

export default LoginView;