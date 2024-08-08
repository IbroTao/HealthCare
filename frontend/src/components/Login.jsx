import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { Navigate, useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const {isAuthenticated, setIsAuthenticated} = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigateTo = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault()
    };

    if(isAuthenticated){
        return <Navigate to={'/'}/>
    }

    return (
        <div className='container form-component login-form'>
            <h2>Sign In</h2>
            <p>Please Login To Continue</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui laborum amet atque libero. Fugiat, animi.</p>
            <form onSubmit={handleLogin}>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password'/>   
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
                <div style={{gap: "10px", justifyContent: "flex-end", flexDirection: "row"}}>
                    <p style={{marginBottom: 0}}>Not Registered?</p>
                    <Link to={'/register'} style={{textDecoration: "none", alignItems: "center"}}>Register Now</Link>
                </div>
                <div style={{justifyContent: "center", alignItems: "center"}}>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login
