import React, { useState } from 'react';
import { FaPhoneAlt, FaLock } from 'react-icons/fa';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'; // Import visibility icons

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white flex shadow-2xl rounded-lg overflow-hidden max-w-5xl w-[843px] h-[503px]">
        {/* Left Section */}
        <div className="relative w-2/5 bg-customBlue hidden md:flex flex-col justify-center items-center p-10 mt-10 rounded-tr-[85px]">
          <h1 className="text-white text-3xl font-bold mb-4 text-center">
            ISEZERANO
            <br />
            Attendance List
          </h1>

          {/* Decorative circles */}
          <div className="absolute top-8 right-9 bg-white h-16 w-16 rounded-full"></div>
          <div className="absolute top-4 right-6 bg-white h-16 w-16 rounded-full opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-radial bg-white to-transparent h-36 w-36 rounded-full filter blur-[102px] "></div>

          <div className="absolute bottom-8 left-16 bg-white h-12 w-12 rounded-full"></div>
          <div className="absolute bottom-12 left-20 bg-white h-12 w-12 rounded-full opacity-10"></div>
          <div className="absolute bottom-3 left-48 bg-gradient-radial bg-white to-transparent h-36 w-36 rounded-full filter blur-[102px] "></div>
        </div>

        {/* Right Section */}
        <div className="right w-full md:w-1/2 p-10 ml-6 flex-col"> {/* Added 'ml-6' for margin */}
          <div className="flex flex-col items-center mb-7">
            <h2 className="text-4xl font-bold text-customBlue mb-6">Login</h2>
            <p className="text-sm text-gray-500">Login to your account</p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="+250-070-000-000"
                className="w-full py-3 pl-12 pr-4 bg-customBlue bg-opacity-15 rounded-full focus:outline-none text-gray-600"
              />
              <span className="absolute left-4 top-3 text-customBlue text-lg">
                <FaPhoneAlt /> {/* Phone Icon */}
              </span>
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="*******************"
                className="w-full py-3 pl-12 pr-12 bg-customBlue bg-opacity-15 rounded-full focus:outline-none text-gray-600"
              />
              <span className="absolute left-4 top-3 text-customBlue text-lg">
                <FaLock /> {/* Lock Icon */}
              </span>
              <span
                className="absolute right-4 top-3 text-customBlue text-lg cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
              </span>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-center text-right mb-6">
              <a href="#" className="text-customBlue hover:underline text-sm">Forgot Password?</a>
            </div>

            {/* Login Button */}
            <div className="flex justify-center mb-6">
              <button className="h-10 items-center relative px-12 text-white font-semibold rounded-full border-2 border-blue-500 transition-all duration-500 ease-in-out bg-blue-500 hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:shadow-lg hover:translate-y-0 hover:scale-100 before:absolute before:inset-0 before:bg-blue-500 before:rounded-full before:transition-transform before:duration-500 before:scale-x-100 hover:before:scale-x-0 before:origin-center">
                <span className="relative z-10">Login</span>
              </button>
            </div>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Don't have an account?{' '}
            <a href="#" className="text-customBlue hover:underline">
              Create Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
