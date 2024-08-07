import React, { useContext, useState } from 'react'
import {Context} from "../main"
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
    const [show, setShow] = useState(false);
    const  {isAuthenticated, setIsAuthenticated} = useContext(Context)

    const navigateTo = useNavigate()

    const handleLogout = async()=> {
            await axios.get("http://localhost:4000/api/v1/user/patient/logout", { 
                useCredentials: true
            }).then(res=>{
                toast.success(res.data.message);
                setIsAuthenticated(false)
            }).catch((err) => {
                toast.error(err.response.data.message)
            })
    }

    const gottoLogin = async()=> {
        navigateTo('/login')
    }

  return (
    <nav className='container'>
        <div className="logo">DivexCare</div>
        <div className={show ? "navLinks showmenu": "navLinks"}>
            <div className="links">
                <Link to={'/'}>HOME</Link>
                <Link to={'/appointment'}>APPOINTMENT</Link>
                <Link to={'/about'}>ABOUT US</Link>
                <Link to={'/about'}>CONTACTS</Link>
            </div>
            {!isAuthenticated ? (
                <button className="logoutBtn btn" onClick={handleLogout}>
                    LOGOUT
                </button>
            ) : (
                <button className="logoutBtn btn" onClick={gottoLogin}>
                    LOGIN
                </button>)}
        </div>
    </nav>
  )
}

export default Navbar