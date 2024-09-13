import React, { useState } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import choir from "../assets/users 1.png";
import { ImSpinner2 } from 'react-icons/im'; // Import spinner icon

const Login = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showLoadingPopup, setShowLoadingPopup] = useState(true); // Control loading spinner popup
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle Send Code button click
  const handleSendCode = () => {
    setShowPopup(true);
    setIsLoading(true);
    setShowLoadingPopup(true); // Show loading popup first
    
    // Simulate loading time for 3 seconds before showing OTP input popup
    setTimeout(() => {
      setIsLoading(false); 
      setShowLoadingPopup(false); // Hide loading popup
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-customBlue flex shadow-2xl overflow-hidden max-w-5xl w-[843px] h-[503px] relative">
        <div className="absolute top-8 right-9 bg-white h-16 w-16 rounded-full z-0"></div>
        <div className="absolute top-4 right-6 bg-white h-16 w-16 rounded-full opacity-10 z-0"></div>

        {/* Left Section */}
        <div className="absolute ml-10 inset-0 bg-gradient-radial bg-white to-transparent h-64 w-64 rounded-full filter blur-[132px]"></div>

        <div className="flex items-center ml-10">
          <div className="relative w-[276px] h-[382px] bg-white bg-opacity-10 border border-white border-opacity-50 rounded-[40px] flex flex-col items-center justify-center shadow-lg backdrop-blur-[123px]">
            <h1 className="text-white text-2xl font-bold mb-2">ISEZERANO Choir</h1>
            <p className="text-white text-lg tracking-widest">Attendance Management</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="right w-full md:w-3/4 p-10 ml-11 flex-col bg-white rounded-tl-[120px] rounded-bl-[120px]">
          <div className="flex flex-col items-center mb-7 mt-5">
            <h2 className="text-5xl font-black text-customBlue mb-6">Login</h2>
            <p className="text-sm text-gray-500">Login to your account</p>
            <p className="text-sm text-gray-500 mt-3">Enter Your Phone</p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="+250-070-000-000"
                className="w-[341px] py-3 pl-20 pr-4 ml-9 bg-white border border-customBlue rounded-full focus:outline-none focus:ring-[1px] focus:ring-customBlue text-gray-600"
              />
              <span className="absolute left-14 top-4 text-customBlue text-lg">
                <FaPhoneAlt />
              </span>
            </div>

            {/* Login Button */}
            <div className="flex justify-center mb-6">
              <button
                type="button"
                onClick={handleSendCode}
                className="h-10 items-center relative px-12 text-white font-semibold rounded-full border-[1px] border-customBlue transition-all duration-500 ease-in-out bg-customBlue hover:bg-white hover:text-customBlue hover:border-customBlue hover:shadow-lg hover:translate-y-0 hover:scale-100 before:absolute before:inset-0 before:bg-customBlue before:rounded-full before:transition-transform before:duration-500 before:scale-x-100 hover:before:scale-x-0 before:origin-center"
              >
                <span className="relative z-10 font-normal">Send Code</span>
              </button>
            </div>
          </form>
          <div className="flex flex-row items-end justify-end">
            <img src={choir} alt="choir" />
          </div>
        </div>

        {/* Popup for Loading (Spinner) */}
        {showPopup && showLoadingPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-3xl w-[300px] shadow-lg flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-customBlue mb-4">OTP CODE</h2>
              <p className="text-gray-500 mb-4">The OTP code has been sent to your phone</p>
              <hr class="border-[1px] w-[350px]  mb-9" />
              <ImSpinner2 className="text-customBlue text-4xl animate-spin" /> {/* Loading Spinner */}
            </div>
          </div>
        )}

        {/* Popup for Entering OTP Code */}
        {showPopup && !showLoadingPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-3xl w-[350px] shadow-lg flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold text-customBlue mb-4">Enter Code</h2>
              <p className="text-gray-500 mb-6">Enter OTP code in the space below</p>
              <hr class="border-[1px] w-[350px]  mb-9" />
              {/* OTP Input */}
              <div className="bg-gray-200 p-3 rounded-full w-[250px] mb-6 text-center">
                <input
                  type="text"
                  maxLength="6"
                  placeholder="______"
                  className="bg-transparent outline-none text-xl tracking-widest text-center w-full"
                />
              </div>
              
              {/* Verify Button */}
              <button
                className="w-full h-10 bg-customBlue text-white rounded-full text-lg font-semibold"
                onClick={() => setShowPopup(false)} // Logic for verifying code
              >
                Verify code
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
