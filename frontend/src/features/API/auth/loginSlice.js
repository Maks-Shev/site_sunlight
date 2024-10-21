import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронный thunk для авторизации пользователя
export const loginUsers = createAsyncThunk(
  'auth/loginUsers',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/auth/jwt/create/', 
        {
          email, password
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      localStorage.setItem('refresh', response.data.refresh);
      localStorage.setItem('access', response.data.access);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue('Неверный логин или пароль (401)');
      } else if (error.response && error.response.status === 400) {
        return rejectWithValue('Некорректные данные (400)');
      } else {
        return rejectWithValue('Ошибка авторизации');
      }
    }
  }
);

// Слайс для регистрации
const loginSlice = createSlice({
  name: 'login',
  initialState: { // инициализация начального состояния
    user: null, // хранит данные пользователя после регистрации
    status: 'idle', // статус процесса регистрации
    error: null, // сообщение об ошибке, если есть
  },
  reducers: {
    // Здесь можно добавить другие редьюсеры, если нужно
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Очистить ошибку перед началом запроса
      })
      .addCase(loginUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Сохранение данных пользователя после успешной регистрации
      })
      .addCase(loginUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Ошибка авторизации'; // Сохранение сообщения об ошибке
      });
  },
});

export default loginSlice.reducer;