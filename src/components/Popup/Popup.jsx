import React from "react";
import Chatbot from "../Chatbot/Chatbot";

const Popup = ({ isPopupOpen, setIsPopupOpen }) => {
  console.log("Popup Component Rendered, isPopupOpen:", isPopupOpen); // Logs the state of the popup

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      {isPopupOpen && (
        <div className="Popup">
          {/* Background overlay */}
          <div
            className="h-screen w-screen fixed top-0 left-0 bg-black/30 z-50 backdrop-blur-sm"
            onClick={closePopup}
          ></div>

          {/* Popup content */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg z-50 shadow-lg">
            <div className="popup-content h-72 w-96">
              {/* Chatbot component */}
              <Chatbot />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;