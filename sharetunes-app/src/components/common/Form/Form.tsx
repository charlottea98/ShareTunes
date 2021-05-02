import React from 'react';

import classes from './Form.module.scss';

// interface Props {
//     signUp:boolean,
//     email:string,
//     setEmail:(targetValue:string) =>void
//     emailError:string,
//     password:string,
//     setPassword:(targetValue:string) =>void,
//     passwordError:string

// }


// const SigningIn: React.FC<Props> = ({email,setEmail,emailError,password,setPassword,passwordError}) =>{

//     return (
//         <div>
//         <label>Mail</label>
//         <input type='text' 
//         autoFocus required value={email} 
//         onChange={e=>setEmail(e.target.value)}>
//         </input>
//         <p>{emailError}</p>
//         <label>Password</label>
//         <input type="password" required value={password}
//         onChange={(e) => {setPassword(e.target.value)}}>
//         </input>
//         <p>{passwordError}</p>
//         </div>

//     )

// }

// const Form : React.FC<Props> = ({signUp,email,setEmail,emailError,password,setPassword,passwordError}) => {
//     let signedUp = signUp

//     if(signedUp){

//         return <SigningIn signUp = {signUp} 
//         email = {email}  
//         setEmail= {setEmail} 
//         emailError = {emailError} 
//         password = {password}

    
//         setPassword = {setPassword}
        
//         passwordError =  {passwordError}/>;
            
//     }

//     else{




//     }
    
// }

// export default Form;