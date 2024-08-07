import React, { useState } from 'react'

const Navbar = () => {
    const [show, setShow] = useState(false)
  return (
    <div className='container'>
        <div className="logo">DivexCare</div>
        <div className={show ? "navLinks showmenu": "navLinks"}>
            <div className="links">
                <Link to={'/'}>HOME</Link>
                <Link to={'/appointment'}>APPOINTMENT</Link>
                <Link to={'/about'}>ABOUT US</US></Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar