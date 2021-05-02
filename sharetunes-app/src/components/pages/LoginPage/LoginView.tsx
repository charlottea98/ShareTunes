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
    password2: string
    setPassword2: (password2: string) => void
    passwordError: string 

    firstName: string
    setFirstName: (firstName: string) => void

    lastName:string 
    setLastName:(lastName: string) => void
   
    username: string
    setUsername: (setUsername: string) => void
    
    handleLogin:() => void
    confirmPasswordSignup: () => void
   

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
    password2,
    setPassword1,
    setPassword2,
    passwordError,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    username,
    setUsername,
    handleLogin,
    confirmPasswordSignup,
    }
    
    ) => {

        

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
                    ) : ( 
                        <>
                         <div className= {[classes.loginContainer, classes.form].join(" ")}>
                            <LogoPresenter fontSize = {"40px"}/>

                            <div className = {classes.form}>
                                <label  className = {classes.formText}>First name</label>
                                <input type='text' autoFocus = {true} required value={firstName} onChange={e=>setFirstName(e.target.value)}></input>
                              
                                <label  className = {classes.formText}>Last name</label>
                                <input type='text' required value={lastName} onChange={e=>setLastName(e.target.value)}></input>

                                <label  className = {classes.formText}>Username</label>
                                <input type='text' required value={username} onChange={e=>setUsername(e.target.value)}></input>
                            

                                <label  className = {classes.formText}>Mail</label>
                                <input type='text' required value={email} onChange={e=>setEmail(e.target.value)}></input>
                                <p className = {classes.errorText}>{emailError}</p>


                                <label  className = {classes.formText}>Password</label>
                                <input type="password" required value={password1} onChange={(e) => {setPassword1(e.target.value)}}></input>
                                <p  className = {classes.errorText}>{passwordError}</p>

                                <label  className = {classes.formText}>Confirm Password</label>
                                <input type="password" required value={password2} onChange={(e) => {setPassword2(e.target.value)}}></input>
                        

                            </div>

                            <SignInUpButton text="Create account" onButtonClick={() => {confirmPasswordSignup();}}/>
                        
                        </div>
                        <SwitchButton  text1 = "Have an account?" text2 = "Sign in" onButtonClick={() => {clearAll();setHasAccount(!hasAccount)}}/>
                      
    
                        </>
                    )}
                
            </div>
        </section>
        </div>
    )
}

export default LoginView;