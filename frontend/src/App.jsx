import React from "react";
import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"
import {ToastContainer, toast} from "react-toastify";


const App = () => {
  return (
    <div>
      <>
        <Router>
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