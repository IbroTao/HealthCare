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
  </div>
}

export default Register