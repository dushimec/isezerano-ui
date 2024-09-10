// src/store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestOtp, verifyOtp, registerAdmin, loginAdmin, logout } from '../services/authSerivece';

export const requestOtpThunk = createAsyncThunk('auth/requestOtp', async (phoneNumber, { rejectWithValue }) => {
  try {
    return await requestOtp(phoneNumber);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const verifyOtpThunk = createAsyncThunk('auth/verifyOtp', async ({ phoneNumber, otp }, { rejectWithValue }) => {
  try {
    return await verifyOtp(phoneNumber, otp);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const registerAdminThunk = createAsyncThunk('auth/registerAdmin', async (adminData, { rejectWithValue }) => {
  try {
    return await registerAdmin(adminData);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const loginAdminThunk = createAsyncThunk('auth/loginAdmin', async (adminCredentials, { rejectWithValue }) => {
  try {
    return await loginAdmin(adminCredentials);
  } catch (error) {
    return rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null,
    role: null, // Store role here
  },
  reducers: {
    logoutAction: (state) => {
      logout();
      state.user = null;
      state.token = null;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestOtpThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(requestOtpThunk.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(requestOtpThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(verifyOtpThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role; // Save role here
      })
      .addCase(registerAdminThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(loginAdminThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role; // Save role here
      });
  },
});

export const { logoutAction } = authSlice.actions;
export default authSlice.reducer;
