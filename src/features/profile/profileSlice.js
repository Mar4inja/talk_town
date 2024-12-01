import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Асинхронные действия для получения, обновления данных профиля и поиска пользователей

// Получение данных профиля
export const fetchProfileData = createAsyncThunk(
  "profile/fetchProfileData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken"); // Получение токена из localStorage
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await fetch("http://localhost:8080/api/users/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch profile data"); // Ошибка при получении данных
      }
      return await response.json(); // Возвращаем данные в формате JSON
    } catch (error) {
      return rejectWithValue(error.message); // Обработка ошибки
    }
  }
);

// Обновление данных профиля
export const updateProfileData = createAsyncThunk(
  "profile/updateProfileData",
  async (updatedData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken"); // Получение токена из localStorage
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await fetch("http://localhost:8080/api/users/auth/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
        },
        body: JSON.stringify(updatedData), // Отправка обновленных данных
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile data"); // Ошибка при обновлении данных
      }
      return await response.json(); // Возвращаем обновленные данные
    } catch (error) {
      return rejectWithValue(error.message); // Обработка ошибки
    }
  }
);

// Generate URL based on search criteria
const generateUrl = ({ firstName, lastName }) => {
  let url = `http://localhost:8080/api/users/findUser?`;
  if (firstName) url += `firstName=${firstName}&`;
  if (lastName) url += `lastName=${lastName}`;
  return url.slice(-1) === '&' ? url.slice(0, -1) : url;
};

// Search Users Thunk
export const searchUsers = createAsyncThunk(
  "profile/searchUsers",
  async ({ firstName, lastName }, { rejectWithValue }) => {
    try {
      const url = generateUrl({ firstName, lastName }); // Generate the URL based on the criteria
      const token = localStorage.getItem('accessToken'); // Retrieve the token from localStorage
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Add the token to the headers
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to search users"); // Error handling
      }
      return await response.json(); // Return the found users in JSON format
    } catch (error) {
      return rejectWithValue(error.message); // Error handling
    }
  }
);



// Слайс для профиля
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      picture: "",
    },
    status: "idle", // Статус загрузки
    error: null, // Ошибка
    isEditing: false, // Режим редактирования
    searchedUsers: [], // Результаты поиска
  },
  reducers: {
    toggleEditMode: (state) => {
      state.isEditing = !state.isEditing; // Переключаем режим редактирования
    },
    resetProfile: (state) => {
      state.data = {
        firstName: "",
        lastName: "",
        email: "",
        birthDate: "",
        picture: "",
      };
      state.status = "idle"; // Сбрасываем статус загрузки
      state.error = null; // Сбрасываем ошибку
      state.isEditing = false; // Отключаем режим редактирования
    },
    resetSearch: (state) => {
      state.searchedUsers = []; // Сбрасываем результаты поиска
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.status = "loading"; // Устанавливаем статус в "loading"
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.status = "succeeded"; // Данные успешно получены
        state.data = action.payload; // Сохраняем данные профиля
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.status = "failed"; // Ошибка при получении данных
        state.error = action.payload; // Сохраняем ошибку
      })
      .addCase(updateProfileData.pending, (state) => {
        state.status = "loading"; // Устанавливаем статус в "loading"
      })
      .addCase(updateProfileData.fulfilled, (state, action) => {
        state.status = "succeeded"; // Данные успешно обновлены
        state.data = action.payload; // Обновляем данные профиля
        state.isEditing = false; // Выключаем режим редактирования
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.status = "failed"; // Ошибка при обновлении данных
        state.error = action.payload; // Сохраняем ошибку
      })
      .addCase(searchUsers.pending, (state) => {
        state.status = "loading"; // Устанавливаем статус в "loading"
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.status = "succeeded"; // Результаты поиска получены
        state.searchedUsers = action.payload; // Сохраняем найденных пользователей
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.status = "failed"; // Ошибка при поиске пользователей
        state.error = action.payload; // Сохраняем ошибку
      });
  },
});

export const { toggleEditMode, resetProfile, resetSearch } =
  profileSlice.actions; // Экспортируем действия
export default profileSlice.reducer; // Экспортируем редюсер
