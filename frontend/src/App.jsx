import React, { useContext, useEffect } from "react";
import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { Context } from "./main";
import axios from "axios";


const App = () => {

  const {isAuthenticated, setUser, setIsAuthenticated} = useContext(Context);
  useEffect(()=>{
    const fetchUser = async()=> {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/patient/me", { useCredentials: true});
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({})
      }
    };
    fetchUser();
  }, [isAuthenticated, setIsAuthenticated, setUser])
  
  return (
    <div>
      <>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/appointment" element={<Appointment/>}/>
            <Route path="/about" element={<AboutUs/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          </Routes>
          <ToastContainer position="top-center"/>
        </Router>
      </>
    </div>
  )
}

export default App