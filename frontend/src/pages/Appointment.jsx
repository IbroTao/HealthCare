import React from 'react'
import AppointmentForm from "../components/AppointmentForm"
import Hero from '../components/Hero'

const Appointment = () => {
  return <>
    <Hero title={"Schedule Your Appointment | DivexCare Medicl Institute"} imageUrl={"./hero.png"}/>
    <AppointmentForm/>
  </>
}

export default Appointment
