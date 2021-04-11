import React, { ReactNode} from 'react';

type Props = {
    email: string,
    setEmail: ReactNode | any,
    password: string,
    setPassword: ReactNode | any,
    handleLogin: ReactNode | any,
    handleSignup: ReactNode | any,
    hasAccount: ReactNode,
    setHasAccount: ReactNode | any,
    emailError: ReactNode,
    passwordError: ReactNode
}

const LoginPage : React.FC<Props> = ({email, setEmail, password, setPassword, handleLogin, handleSignup, hasAccount,setHasAccount, emailError,passwordError}) => {
    return (
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
                <div>
                    {hasAccount ? (
                        <>
                        <button onClick={handleLogin}>Sign in</button>
                        <p>Don't have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
                        </>
                    ) : (
                        <>
                        <button onClick={handleSignup}>Sign up</button>
                        <p>Have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default LoginPage;