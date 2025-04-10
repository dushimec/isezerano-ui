import React from "react";
import Navbar from "../components/secretary/NavbarSecretary/Navbar";
import Secretary from "../components/secretary/section";
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
      {/* <Secretary /> */}
    </div>
  );
};

export default SecretaryDashboard;
