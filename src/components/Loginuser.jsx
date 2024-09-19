import React, { useState } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import choir from "../assets/users 1.png";
import { ImSpinner2 } from 'react-icons/im';
import { useAuth } from '../services/authProvider';

const Login = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { requestOtp, verifyOtp } = useAuth();

  const handleSendCode = async () => {
    if (!phoneNumber) {
      setError('Phone number is required'); 
      return;
    }

    try {
      setIsLoading(true); // Show spinner
      setShowLoadingPopup(true); // Show loading popup
      setError(''); // Clear any previous error

      await requestOtp(phoneNumber);

      // On success
      setSuccess('OTP code sent successfully');
      setShowLoadingPopup(false); // Hide loading popup
      setShowPopup(true); // Show OTP entry popup
    } catch (error) {
      // On error
      setIsLoading(false); // Hide spinner
      setShowLoadingPopup(false); // Hide loading popup
      setError(error.response?.data?.error || 'Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyCode = async () => {
    if (!otp) {
      setError('OTP code is required');
      return;
    }

    try {
      await verifyOtp(phoneNumber, otp);
      setSuccess('OTP verified successfully');
      setError(''); // Clear any previous error
      // Redirect or handle post-verification logic here
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to verify OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-customBlue flex shadow-2xl overflow-hidden max-w-5xl w-[843px] h-[503px] relative">
        <div className="absolute top-8 right-9 bg-white h-16 w-16 rounded-full z-0"></div>
        <div className="absolute top-4 right-6 bg-white h-16 w-16 rounded-full opacity-10 z-0"></div>
        <div className="absolute ml-10 inset-0 bg-gradient-radial bg-white to-transparent h-64 w-64 rounded-full filter blur-[132px]"></div>
        <div className="flex items-center ml-10">
          <div className="relative w-[276px] h-[382px] bg-white bg-opacity-10 border border-white border-opacity-50 rounded-[40px] flex flex-col items-center justify-center shadow-lg backdrop-blur-[123px]">
            <h1 className="text-white text-2xl font-bold mb-2">ISEZERANO Choir</h1>
            <p className="text-white text-lg tracking-widest">Attendance Management</p>
          </div>
        </div>
        <div className="right w-full md:w-3/4 p-10 ml-11 flex-col bg-white rounded-tl-[120px] rounded-bl-[120px]">
          <div className="flex flex-col items-center mb-7 mt-5">
            <h2 className="text-5xl font-black text-customBlue mb-6">Login</h2>
            <p className="text-sm text-gray-500">Login to your account</p>
            <p className="text-sm text-gray-500 mt-3">Enter Your Phone</p>
          </div>
          {/* Place the error message here */}
          {error && <p className="text-red-500 ml-9 text-sm mb-4">{error}</p>}
          <form className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="+250-070-000-000"
                className="w-[341px] py-3 pl-20 pr-4 ml-9 bg-white border border-customBlue rounded-full focus:outline-none focus:ring-[1px] focus:ring-customBlue text-gray-600"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <span className="absolute left-14 top-4 text-customBlue text-lg">
                <FaPhoneAlt />
              </span>
            </div>
            <div className="flex justify-center mb-6">
              <button
                type="button"
                onClick={handleSendCode}
                className="h-10 items-center relative px-12 text-white font-semibold rounded-full border-[1px] border-customBlue transition-all duration-500 ease-in-out bg-customBlue hover:bg-white hover:text-customBlue hover:border-customBlue hover:shadow-lg hover:translate-y-0 hover:scale-100"
              >
                {isLoading ? (
                  <ImSpinner2 className="text-white text-2xl animate-spin" />
                ) : (
                  <span className="relative z-10 font-normal">Send Code</span>
                )}
              </button>
            </div>
          </form>
          <div className="flex flex-row items-end justify-end">
            <img src={choir} alt="choir" />
          </div>
        </div>
        {showLoadingPopup && !showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-3xl w-[300px] shadow-lg flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-customBlue mb-4">OTP CODE</h2>
              <p className="text-gray-500 mb-4">The OTP code has been sent to your phone</p>
              <hr className="border-[1px] w-[350px] mb-9" />
              <ImSpinner2 className="text-customBlue text-4xl animate-spin" />
            </div>
          </div>
        )}
        {showPopup && !showLoadingPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-3xl w-[350px] shadow-lg flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold text-customBlue mb-4">Enter Code</h2>
              <p className="text-gray-500 mb-6">Enter OTP code in the space below</p>
              <hr className="border-[1px] w-[350px] mb-9" />
              <div className="bg-gray-200 p-3 rounded-full w-[250px] mb-6 text-center">
                <input
                  type="text"
                  maxLength="6"
                  placeholder="code______"
                  className="bg-transparent outline-none text-xl tracking-widest text-center w-full"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button
                className="w-full h-10 bg-customBlue text-white rounded-full text-lg font-semibold"
                onClick={handleVerifyCode}
              >
                Verify code
              </button>
              {error && <p className="text-red-500 ml-9 text-sm">{error}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
