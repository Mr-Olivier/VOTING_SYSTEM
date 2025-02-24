import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/services/auth.service';
import type { 
  AuthState, 
  CheckRegNoPayload, 
  VerifyOTPPayload, 
  CreatePasswordPayload, 
  LoginPayload 
} from '@/types/auth';

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
  verificationStep: 'regNoCheck',
  registrationNumber: null,
  otpId: null,
  isAuthenticated: false
};

// Check Registration Number
export const checkRegNo = createAsyncThunk(
  'auth/checkRegNo',
  async (payload: CheckRegNoPayload, { rejectWithValue }) => {
    try {
      const response = await authService.checkRegNo(payload);
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Registration number check failed');
    }
  }
);

// Verify OTP
export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async (payload: VerifyOTPPayload, { rejectWithValue }) => {
    try {
      const response = await authService.verifyOTP(payload);
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'OTP verification failed');
    }
  }
);

// Create Password
export const createPassword = createAsyncThunk(
  'auth/createPassword',
  async (payload: CreatePasswordPayload, { rejectWithValue }) => {
    try {
      const response = await authService.createPassword(payload);
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Password creation failed');
    }
  }
);

// Login
export const login = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await authService.login(payload);
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      authService.setToken(response.data.token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  } 
);

// Logout
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.error = null;
      state.loading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setVerificationStep: (state, action) => {
      state.verificationStep = action.payload;
    },
    setRegistrationNumber: (state, action) => {
      state.registrationNumber = action.payload;
    },
    setOtpId: (state, action) => {
      state.otpId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Check RegNo
      .addCase(checkRegNo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkRegNo.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationStep = 'otpVerification';
        if (action.payload.otpId) {
          state.otpId = action.payload.otpId;
        }
      })
      .addCase(checkRegNo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Verify OTP
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.loading = false;
        state.verificationStep = 'createPassword';
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Password
      .addCase(createPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationStep = 'complete';
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(createPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.verificationStep = 'regNoCheck';
        state.registrationNumber = null;
        state.otpId = null;
        state.loading = false;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  resetAuthState, 
  setVerificationStep,
  setRegistrationNumber,
  setOtpId
} = authSlice.actions;

export default authSlice.reducer;