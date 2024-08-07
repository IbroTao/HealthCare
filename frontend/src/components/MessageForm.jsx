import React, { useState } from 'react'

const MessageForm = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const handleMessage = (e) => {
    e.preventDefault();
  }
  return (
    <div className='container form-component message-form'>
      <h2>Send Us A Message</h2> 
      <form onSubmit={handleMessage}>
        <div>
          <input type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          <input type="text" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        </div>
        <div>
          <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="number" placeholder='Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)}/>
        </div>
      </form>     
    </div>
  )
}

export default MessageForm
