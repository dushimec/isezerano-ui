import React from 'react'
import Navbar from '../components/singer/NavbarSinger/Navbar';


const SingerDashboard = () => {  const toggleIsPopupOpen = () => {
  setIsPopupOpen((prev) => {
    const newState = !prev;
    console.log("Popup Toggled:", newState); // Debug log
    return newState;
  });
};

  return (
    <div>  
    <Navbar handleIsPopupOpen={toggleIsPopupOpen} />

    </div>
  )
}

export default SingerDashboard