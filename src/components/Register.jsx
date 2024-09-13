import React, { useState } from 'react';
import { FaUser, FaPhoneAlt, FaLock } from 'react-icons/fa';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'; // Import visibility icons

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white flex shadow-2xl rounded-lg overflow-hidden max-w-5xl  w-[843px] h-[503px]">
        {/* Left Section */}
        <div className="relative w-2/5 bg-blue-600 hidden md:flex flex-col justify-center items-center p-10 mt-10 rounded-tr-[85px]">
          <h1 className="text-white text-4xl font-bold mb-4">
            ISEZERANO
            <br />
            Attendance List
          </h1>
         
          <div className="absolute top-8 right-9 bg-white h-16 w-16 rounded-full"></div>
          <div className="absolute top-4 right-6 bg-white h-16 w-16 rounded-full opacity-10"></div>

          <div className="absolute bottom-8 left-16 bg-white h-12 w-12 rounded-full"></div>
          <div className="absolute bottom-12 left-20 bg-white h-12 w-12 rounded-full opacity-10"></div>
        </div >

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-4xl font-bold text-blue-600">Register</h2>
            <p className="text-sm text-gray-500">Create account</p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full py-3 pl-12 pr-4 bg-gray-100 rounded-full focus:outline-none text-gray-600"
              />
              <span className="absolute left-4 top-3 text-blue-500 text-lg">
                <FaUser /> {/* User Icon */}
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="+250-070-000-000"
                className="w-full py-3 pl-12 pr-4 bg-gray-100 rounded-full focus:outline-none text-gray-600"
              />
              <span className="absolute left-4 top-3 text-blue-500 text-lg">
                <FaPhoneAlt /> {/* Phone Icon */}
              </span>
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="***********"
                className="w-full py-3 pl-12 pr-12 bg-gray-100 rounded-full focus:outline-none text-gray-600"
              />
              <span className="absolute left-4 top-3 text-blue-500 text-lg">
                <FaLock /> {/* Lock Icon */}
              </span>
              <span
                className="absolute right-4 top-3 text-blue-500 text-lg cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
              </span>
            </div>

            <div className="flex justify-center mb-6">
              <button className="w-[173px] bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition-all">
                Sign up
              </button>
            </div>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Already have an account?{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
