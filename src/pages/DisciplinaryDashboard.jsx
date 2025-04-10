import React from "react";
// import Navbar from "../components/disciplinary/NavbarDisciplinary/Navbar";
import Navbar from "../components/disciplinary/NavbarDisciplinary/Navbar"; // Relative path from current file

const SecretaryDashboard = () => {
  const toggleIsPopupOpen = () => {
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
  );
};

export default SecretaryDashboard;
