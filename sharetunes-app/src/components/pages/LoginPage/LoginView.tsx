import React, { ReactNode,useEffect, useState } from 'react';

//import firebase from 'firebase';

import classes from './loginPage.module.scss';
import LogoPresenter from '../../common/Logo/LogoPresenter';
import SignInUpButton from '../../common/buttons/SignInUpButton/SignInUpButton'
import SwitchButton from '../../common/buttons/SwitchButton/SwitchButton'


// Gör om form till en komponent också? Men blir väldigt mycket kodupprepning då 

interface Props {
    
    clearAll: () => void
    hasAccount: boolean
    setHasAccount:(hasAccount:boolean) => void

    email: string
    setEmail:(email: string) => void
    emailError: string 

    password1: string
    setPassword1: (password1: string) => void
    passwordError: string 


    
    handleLogin:() => void

   

}


const LoginView : React.FC<Props> = (
    {
    clearAll,
    hasAccount,
    setHasAccount,
    email,
    setEmail,
    emailError,
    password1,
    setPassword1,
    passwordError,
    handleLogin,

    }
    
    ) => {

        
    return (
        <div className={classes.LoginPage}>
        <section>
            <>
            <div className= {[classes.loginContainer,classes.form].join(" ")}>

                <LogoPresenter fontSize = {"40px"}/>

                <div className = {classes.form}>

                    <label className = {classes.formText}>Mail</label>
                    <input type='text' autoFocus = {true} required value={email} onChange={e=>setEmail(e.target.value)} ></input>
                    <p className = {classes.errorText}>{emailError}</p>
                    
                    <label  className = {classes.formText}>Password</label>
                    <input type="password" required value={password1} onChange={(e) => {setPassword1(e.target.value)}}></input>
                    <p  className = {classes.errorText}>{passwordError}</p>

                </div>
                
                <SignInUpButton text="Sign in" onButtonClick={() => {handleLogin();}}/>

            </div>
            
            <SwitchButton text1 = "Don't have an account?" text2 = "Sign up" onButtonClick={() => {clearAll();setHasAccount(!hasAccount)}}/>

        
            </>
                
        </section>
        </div>
    )
}

export default LoginView;