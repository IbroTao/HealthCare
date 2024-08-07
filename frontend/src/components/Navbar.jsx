import React, { useState } from 'react'

const Navbar = () => {
    const [show, setShow] = useState()
  return (
    <div className='container'>
        <div className="logo">DivexCare</div>
        <div className={show ? "navLinks showmenu": "navLinks"}></div>
    </div>
  )
}

export default Navbar