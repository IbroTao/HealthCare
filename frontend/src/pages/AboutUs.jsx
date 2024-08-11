import React, { useContext } from 'react'
import Hero from "../components/Hero"
import Biography from "../components/Biography"

const AboutUs = () => {
  return (
    <>
      <Hero title={"Learn More About Us | Divex Medical Institute"} imageUrl={"/about.png"}/>
      <Biography imageUrl={"/whoweare.png"}/>
    </>
  )
}



export default AboutUs