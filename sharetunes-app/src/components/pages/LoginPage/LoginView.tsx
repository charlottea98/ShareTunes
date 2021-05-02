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

    password: string
    setPassword: (password: string) => void
    passwordError: string 

    firstName: string
    setFirstName: (firstName: string) => void

    lastName:string 
    setLastName:(lastName: string) => void
   
    username: string
    setUsername: (setUsername: string) => void
    
    handleLogin:() => void
    handleSignup:() => void
   

}


const LoginView : React.FC<Props> = (
    {
    clearAll,
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
    lastName,
    setLastName,
    username,
    setUsername,
    handleLogin,
    handleSignup,
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
                                <input type='text' autoFocus required value={email} onChange={e=>setEmail(e.target.value)} ></input>
                                <p className = {classes.errorText}>{emailError}</p>
                                
                                <label  className = {classes.formText}>Password</label>
                                <input type="password" required value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
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
                                <input type='text' autoFocus required value={firstName} onChange={e=>setFirstName(e.target.value)}></input>
                              
                                <label  className = {classes.formText}>Last name</label>
                                <input type='text'  autoFocus required value={lastName} onChange={e=>setLastName(e.target.value)}></input>

                                <label  className = {classes.formText}>Username</label>
                                <input type='text' autoFocus required value={username} onChange={e=>setUsername(e.target.value)}></input>
                            

                                <label  className = {classes.formText}>Mail</label>
                                <input type='text'autoFocus required value={email} onChange={e=>setEmail(e.target.value)}></input>
                                <p className = {classes.errorText}>{emailError}</p>

                                <label  className = {classes.formText}>Password</label>
                                <input type="password" required value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
                                <p  className = {classes.errorText}>{passwordError}</p>

                            </div>

                            <SignInUpButton text="Create account" onButtonClick={() => {handleSignup();}}/>
                        
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