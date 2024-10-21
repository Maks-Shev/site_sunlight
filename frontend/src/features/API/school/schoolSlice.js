import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// функция для создания асинхронного запроса (thunk); axios библиотека для выполнения HTTP запросов, поддерживает более широкий диапозон браузеров
export const fetchSchool = createAsyncThunk('school/fetchSchool', async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/school/school/');
    
    return response.data; // возвращение данных из ответа
  } catch (error) {
    if (error.response && error.response.status === 503) { // обработка ошибки полученной с сервера
      throw new Error('Сервис временно недоступен (503)');
    } else {
      throw new Error('Ошибка при получении списка школ');
    }
  }
});

export const fetchSchoolById = createAsyncThunk('school/fetchSchoolById', async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/school/school/${id}/`);
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 503) {
      throw new Error('Сервис временно недоступен (503)');
    } else {
      throw new Error(`Ошибка при получении данных школы с ID ${id}`);
    }
  }
});

const schoolSlice = createSlice({ // Функция для создания состояния
  name: 'school',
  initialState: { // инициализация начального состояния
    school: null, // переменная для храненния объекта
    currentSchool: null, // переменная для хранения текущей школы
    status: 'idle', // статус простоя, ожидание дальнейшего действия
    error: null, // переменная для хранения сообщения об ошибке
  },
  reducers: {}, // функции для изменения состояния синхронно
  extraReducers: (builder) => { // функция для изменения состояния асинхронно
    builder
      .addCase(fetchSchool.pending, (state) => { // состояние начального этапа загрузки
        state.status = 'loading';
      })
      .addCase(fetchSchool.fulfilled, (state, action) => { // состояние после успешной загрузки данных
        state.status = 'succeeded';
        state.school = action.payload; // сохранение состояния в поле school
      })
      .addCase(fetchSchool.rejected, (state, action) => { // состояние после ошибки
        state.status = 'failed';
        state.error = action.error.message; // сохранение сообщения состояния в поле error
      });


    builder
      .addCase(fetchSchoolById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSchoolById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentSchool = action.payload;
      })
      .addCase(fetchSchoolById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default schoolSlice.reducer;