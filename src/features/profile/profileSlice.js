import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Асинхронное действие для получения данных профиля
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
      if (!response.ok) throw new Error("Failed to fetch profile data"); // Если ответ не OK, выбрасываем ошибку
      return await response.json(); // Возвращаем данные в формате JSON
    } catch (error) {
      return rejectWithValue(error.message); // Обработка ошибок
    }
  }
);

// Асинхронное действие для обновления данных профиля
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
        body: JSON.stringify(updatedData), // Отправляем обновленные данные
      });
      if (!response.ok) throw new Error("Failed to update profile data"); // Если ответ не OK, выбрасываем ошибку
      return await response.json(); // Возвращаем обновленные данные в формате JSON
    } catch (error) {
      return rejectWithValue(error.message); // Обработка ошибок
    }
  }
);

// Слайс профиля
const profileSlice = createSlice({
  name: "profile", // Имя слайса
  initialState: {
    data: {
      firstName: "", // Имя
      lastName: "", // Фамилия
      email: "", // Email
      birthDate: "", // Дата рождения
      picture: "", // Ссылка на изображение профиля (может быть пустой)
    },
    status: "idle", // Состояние загрузки
    error: null, // Ошибки
    isEditing: false, // Флаг редактирования
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
  },
  extraReducers: (builder) => {
    builder
      // Обработка получения данных профиля
      .addCase(fetchProfileData.pending, (state) => {
        state.status = "loading"; // Устанавливаем статус "загрузка"
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.status = "succeeded"; // Успешная загрузка
        state.data = action.payload; // Сохраняем данные в store
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.status = "failed"; // Ошибка загрузки
        state.error = action.payload; // Сохраняем сообщение об ошибке
      })
      // Обработка обновления данных профиля
      .addCase(updateProfileData.pending, (state) => {
        state.status = "loading"; // Устанавливаем статус "загрузка"
      })
      .addCase(updateProfileData.fulfilled, (state, action) => {
        state.status = "succeeded"; // Успешное обновление
        state.data = action.payload; // Обновляем данные профиля в store
        state.isEditing = false; // Выходим из режима редактирования
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.status = "failed"; // Ошибка обновления
        state.error = action.payload; // Сохраняем сообщение об ошибке
      });
  },
});

// Экспорт действий
export const { toggleEditMode, resetProfile } = profileSlice.actions;

// Экспорт редьюсера
export default profileSlice.reducer;
