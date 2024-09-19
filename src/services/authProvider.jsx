import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestOtpThunk, verifyOtpThunk, loginAdminThunk, registerAdminThunk, logoutAction } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, role, error, status } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const requestOtp = (phoneNumber) => {
    try {
      
      dispatch(requestOtpThunk(phoneNumber));
    } catch (error){
      if (error.response?.status === 500) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.response?.data?.error );
      }
    }
  };

  const verifyOtp = async (phoneNumber, otp) => {
    try {
      const result = await dispatch(verifyOtpThunk({ phoneNumber, otp })).unwrap();
      localStorage.setItem('token', result.token); 
      localStorage.setItem('role', result.role);   
      navigateToRole(result.role);
    } catch (error) {
      if (error.response?.status === 500) {
        throw new Error(error.response.data.message || 'Server error. Please try again later.');
      } else {
        throw new Error(error.response?.data?.error || 'An unexpected error occurred.');
      }
    }
  };

  const loginAdmin = (adminCredentials) => {
    dispatch(loginAdminThunk(adminCredentials));
  };

  const registerAdmin = (adminData) => {
    dispatch(registerAdminThunk(adminData));
  };

  const logout = () => {
    dispatch(logoutAction());
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  const navigateToRole = (role) => {
    switch (role) {
      case 'Admin':
        navigate('/admin-dashboard');
        break;
      case 'Singer':
        navigate('/singer-dashboard');
        break;
      case 'Secretary':
        navigate('/secretary-dashboard');
        break;
      case 'Disciplinary':
        navigate('/disciplinary-dashboard');
        break;
      default:
        navigate('/');
    }
  };

  useEffect(() => {
    if (status === 'failed' && error) {
      alert(`Error: ${error}`); // Replace with a more user-friendly way to display errors
    }
  }, [status, error]);

  return (
    <AuthContext.Provider value={{ requestOtp, verifyOtp, loginAdmin, registerAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
