import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestOtp, verifyOtp, registerAdmin, loginAdmin, logout } from '../services/authSerivece';

// Define async thunks
export const requestOtpThunk = createAsyncThunk('auth/requestOtp', async (phoneNumber, { rejectWithValue }) => {
  try {
    return await requestOtp(phoneNumber);
  } catch (error) {
    return rejectWithValue(error.response?.data.error || error.message);
  }
});

export const verifyOtpThunk = createAsyncThunk('auth/verifyOtp', async ({ phoneNumber, otp }, { rejectWithValue }) => {
  try {
    return await verifyOtp(phoneNumber, otp);
  } catch (error) {
    return rejectWithValue(error.response?.data.error || error.message);
  }
});

export const registerAdminThunk = createAsyncThunk('auth/registerAdmin', async (adminData, { rejectWithValue }) => {
  try {
    return await registerAdmin(adminData);
  } catch (error) {
    return rejectWithValue(error.response?.data.error || error.message);
  }
});

export const loginAdminThunk = createAsyncThunk('auth/loginAdmin', async (adminCredentials, { rejectWithValue }) => {
  try {
    return await loginAdmin(adminCredentials);
  } catch (error) {
    return rejectWithValue(error.response?.data.error || error.message);
  }
});

// Create auth slice
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
      .addCase(verifyOtpThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyOtpThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role; // Save role here
        state.status = 'succeeded';
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(registerAdminThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerAdminThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = 'succeeded';
      })
      .addCase(registerAdminThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loginAdminThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAdminThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role; // Save role here
        state.status = 'succeeded';
      })
      .addCase(loginAdminThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logoutAction } = authSlice.actions;
export default authSlice.reducer;
