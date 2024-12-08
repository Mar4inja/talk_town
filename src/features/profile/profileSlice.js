import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  avatar: '',
  birthDate: '',
  isLoggedIn: false,
};

export const fetchUserData = createAsyncThunk(
  'profile/fetchUserData',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('accessToken');
    console.log("Token from localStorage:", token); // Добавьте логирование токена
    if (!token) {
      return rejectWithValue('No token found');
    }

    try {
      const response = await fetch('http://localhost:8080/api/users/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log("Server response:", response); // Добавьте логирование ответа
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("Data from server:", data); // Логирование данных
      return data;
    } catch (error) {
      console.log("Error fetching data:", error); // Логирование ошибки
      return rejectWithValue(error.message);
    }
  }
);


const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.birthDate = action.payload.birthDate;
      state.isLoggedIn = true;
    },
    clearProfile: (state) => {
      state.name = '';
      state.email = '';
      state.avatar = '';
      state.birthDate = '';
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.avatar = action.payload.avatar;
        state.birthDate = action.payload.birthDate;
        state.isLoggedIn = true;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoggedIn = false;
      });
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
