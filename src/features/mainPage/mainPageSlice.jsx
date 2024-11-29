import { createSlice } from "@reduxjs/toolkit";

const mainPageSlice = createSlice({
  name: "mainPage", 
  initialState: { 
    title: "", 
    description: "" 
  },
  reducers: { // Редьюсеры для обновления состояния
    setTitle(state, action) { // Устанавливаем заголовок
      state.title = action.payload; // Обновляем заголовок в состоянии
    },
    setDescription(state, action) { // Устанавливаем описание
      state.description = action.payload; // Обновляем описание в состоянии
    },
  },
});

// Экспортируем действия и редьюсер
export const { setTitle, setDescription } = mainPageSlice.actions; // Экспортируем действия
export default mainPageSlice.reducer; // Экспортируем редьюсер
