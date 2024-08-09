import React, {useState} from 'react'
import {Context} from '../main'
import {Navigate, useNavigate} from "react-router-dom"

const Register = () => {
  const {isAuthenticated, setIsAuthenticated} = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = async(e) => {
    e.preventDefault()
  };

  if(isAuthenticated) {
    return <Navigate to={"/"}/> 
  };


  return <div className="container form-component register-form">
    <h2>Sign Up</h2>
    <p>Please Sign Up To Continue</p>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat labore, adipisci enim temporibus quod sint?</p>
    <form onSubmit={handleRegister}>
      <div>
        <input type="text" placeholder='First Name' value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
        <input type="text" placeholder='Last Name' value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
      </div>
      <div>
        <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <div>
        <input type="number" placeholder='NIC' value={nic} onChange={(e) => setNic(e.target.value)}/>
        <input type="date" placeholder='Date Of Birth' value={dob} onChange={(e) => setDob(e.target.value)}/>
      </div>
      <div>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
    </form>
  </div>
}

export default Register