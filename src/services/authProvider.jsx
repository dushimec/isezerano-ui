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
    dispatch(requestOtpThunk(phoneNumber));
  };

  const verifyOtp = async (phoneNumber, otp) => {
    try {
      const result = await dispatch(verifyOtpThunk({ phoneNumber, otp })).unwrap();
      navigateToRole(result.role);
    } catch (error) {
      console.error('Failed to verify OTP:', error);
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
  };

  const navigateToRole = (role) => {
    switch (role) {
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
        navigate('/login');
    }
  };

  useEffect(() => {
    if (status === 'loading') setIsLoading(true);
    else setIsLoading(false);
  }, [status]);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, error, requestOtp, verifyOtp, loginAdmin, registerAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
