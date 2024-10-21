import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронный thunk для регистрации пользователя
export const registerUsers = createAsyncThunk(
    'register/registerUsers',
    async ({ first_name, last_name, patronymic, email, password, phone }, { rejectWithValue }) => {
      try {
const response = await axios.post(
    'http://127.0.0.1:8000/api/auth/users/',
    {
        first_name, last_name, patronymic, email, password, phone
    },
    {
        headers: {
            'Content-Type': 'application/json',
        }
    }
);
return response.data;
} catch (error) {
    if (error.response && error.response.status === 401) {
        return rejectWithValue('Неверный логин или пароль (401)');
    } else if (error.response && error.response.status === 400) {
        return rejectWithValue('Некорректные данные (400)');
    } else {
        return rejectWithValue('Ошибка регистрации');
    }
}
}
);

// Слайс для регистрации
const registerSlice = createSlice({
    name: 'register',
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
            .addCase(registerUsers.pending, (state) => {
                state.status = 'loading';
                state.error = null; // Очистить ошибку перед началом запроса
            })
            .addCase(registerUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload; // Сохранение данных пользователя после успешной регистрации
            })
            .addCase(registerUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Ошибка регистрации'; // Сохранение сообщения об ошибке
            });
    },
});


export default registerSlice.reducer;