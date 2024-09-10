
import axiosInstance, { setToken, removeToken } from "../axiosConfig";

export const requestOtp = async (phoneNumber) => {
  try {
    const response = await axiosInstance.post("/auth/request", { phoneNumber });
    return response.data;
  } catch (error) {
    throw error.response.data.message || error.message;
  }
};

export const verifyOtp = async (phoneNumber, otp) => {
  try {
    const response = await axiosInstance.post("/auth/verify", { phoneNumber, otp });
    setToken(response.data.token);
    return response.data; 
  } catch (error) {
    throw error.response.data.message || error.message;
  }
};

export const registerAdmin = async (adminData) => {
  try {
    const response = await axiosInstance.post("/auth/register-admin", adminData);
    return response.data;
  } catch (error) {
    throw error.response.data.message || error.message;
  }
};

export const loginAdmin = async (adminCredentials) => {
  try {
    const response = await axiosInstance.post("/auth/login-admin", adminCredentials);
    setToken(response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data.message || error.message;
  }
};

export const logout = () => {
  removeToken();
};
