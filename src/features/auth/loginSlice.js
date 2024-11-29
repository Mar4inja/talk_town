import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  isLoggedIn: false,  // This field is used to determine if the user is logged in
  loading: false,
  error: null,
  accessToken: null,
  refreshToken: null,
};

// Async Thunk - User login
export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (data, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        return thunkAPI.rejectWithValue(errorResponse.message || 'Failed to login');
      }

      const userData = await response.json();
      localStorage.setItem('accessToken', userData.accessToken);
      localStorage.setItem('refreshToken', userData.refreshToken);
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'An error occurred');
    }
  }
);

// Slice creation
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.email = '';
      state.password = '';
      state.isLoggedIn = false;
      state.error = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.email = action.payload.email;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { logout, setAccessToken, setRefreshToken } = loginSlice.actions;
export const selectLoginState = (state) => state.login;
export const selectAccessToken = (state) => state.login.accessToken;
export const selectRefreshToken = (state) => state.login.refreshToken;
export default loginSlice.reducer;
