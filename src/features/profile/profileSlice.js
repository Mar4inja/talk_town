import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Асинхронные действия для получения, обновления данных профиля и поиска пользователей

// Получение данных профиля
export const fetchProfileData = createAsyncThunk(
  "profile/fetchProfileData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken"); // Получение токена из localStorage
      const response = await fetch("http://localhost:8080/api/users/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
        },
      });
      if (!response.ok) throw new Error("Failed to fetch profile data"); // Ошибка при получении данных
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
      const response = await fetch("http://localhost:8080/api/users/auth/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
        },
        body: JSON.stringify(updatedData), // Отправка обновленных данных
      });
      if (!response.ok) throw new Error("Failed to update profile data"); // Ошибка при обновлении данных
      return await response.json(); // Возвращаем обновленные данные
    } catch (error) {
      return rejectWithValue(error.message); // Обработка ошибки
    }
  }
);

// Поиск пользователей по имени и фамилии
export const searchUsers = createAsyncThunk(
  "profile/searchUsers",
  async ({ firstName, lastName }, { rejectWithValue }) => {
    try {
      // Если указаны оба параметра, отправляется запрос с обоими
      const query = new URLSearchParams();
      if (firstName) query.append("firstName", firstName);
      if (lastName) query.append("lastName", lastName);
      
      const response = await fetch(`http://localhost:8080/api/users/search?${query.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to search users");
      return await response.json(); // Возвращаем найденных пользователей
    } catch (error) {
      return rejectWithValue(error.message); // Обработка ошибки
    }
  }
);

// Слайс для профиля
const profileSlice = createSlice({
  name: "profile", // Имя слайса
  initialState: {
    data: {
      firstName: "", // Имя
      lastName: "", // Фамилия
      email: "", // Email
      birthDate: "", // Дата рождения
      picture: "", // Ссылка на изображение профиля
    },
    status: "idle", // Состояние загрузки
    error: null, // Ошибки
    isEditing: false, // Режим редактирования
    searchedUsers: [], // Массив найденных пользователей
  },
  reducers: {
    toggleEditMode: (state) => {
      state.isEditing = !state.isEditing; // Переключение режима редактирования
    },
    resetProfile: (state) => {
      // Сброс данных профиля
      state.data = {
        firstName: "",
        lastName: "",
        email: "",
        birthDate: "",
        picture: "",
      };
      state.status = "idle";
      state.error = null;
      state.isEditing = false;
    },
    resetSearch: (state) => {
      state.searchedUsers = []; // Очистка результатов поиска
    }
  },
  extraReducers: (builder) => {
    builder
      // Загрузка данных профиля
      .addCase(fetchProfileData.pending, (state) => {
        state.status = "loading"; // Устанавливаем статус "loading"
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.status = "succeeded"; // Успешная загрузка
        state.data = action.payload; // Сохраняем данные профиля
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.status = "failed"; // Ошибка загрузки
        state.error = action.payload; // Сохраняем ошибку
      })
      // Обновление данных профиля
      .addCase(updateProfileData.pending, (state) => {
        state.status = "loading"; // Устанавливаем статус "loading"
      })
      .addCase(updateProfileData.fulfilled, (state, action) => {
        state.status = "succeeded"; // Успешное обновление
        state.data = action.payload; // Обновляем данные профиля
        state.isEditing = false; // Выход из режима редактирования
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.status = "failed"; // Ошибка обновления
        state.error = action.payload; // Сохраняем ошибку
      })
      // Поиск пользователей
      .addCase(searchUsers.pending, (state) => {
        state.status = "loading"; // Устанавливаем статус "loading"
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.status = "succeeded"; // Успешный поиск
        state.searchedUsers = action.payload; // Сохраняем найденных пользователей
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.status = "failed"; // Ошибка поиска
        state.error = action.payload; // Сохраняем ошибку
      });
  },
});

// Экспортируем действия
export const { toggleEditMode, resetProfile, resetSearch } = profileSlice.actions;

// Экспорт редьюсера
export default profileSlice.reducer;
