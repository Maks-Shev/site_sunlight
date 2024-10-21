import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// функция для создания асинхронного запроса (thunk); axios библиотека для выполнения HTTP запросов, поддерживает более широкий диапозон браузеров
export const fetchWorkshop = createAsyncThunk('workshop/fetchWorkshop', async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/workshop/workshop/');
    
    return response.data; // возвращение данных из ответа
  } catch (error) {
    if (error.response && error.response.status === 503) { // обработка ошибки полученной с сервера
      throw new Error('Сервис временно недоступен (503)');
    } else {
      throw new Error('Ошибка при получении списка мастерских');
    }
  }
});

export const fetchWorkshopById = createAsyncThunk('workshop/fetchWorkshopById', async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/workshop/workshop/${id}/`);
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 503) {
      throw new Error('Сервис временно недоступен (503)');
    } else {
      throw new Error(`Ошибка при получении данных мастерской с ID ${id}`);
    }
  }
});

const workshopSlice = createSlice({ // Функция для создания состояния
  name: 'workshop',
  initialState: { // инициализация начального состояния
    workshop: null, // переменная для храненния объекта
    currentWorkshop: null, // переменная для хранения текущей мастерской
    status: 'idle', // статус простоя, ожидание дальнейшего действия
    error: null, // переменная для хранения сообщения об ошибке
  },
  reducers: {}, // функции для изменения состояния синхронно
  extraReducers: (builder) => { // функция для изменения состояния асинхронно
    builder
      .addCase(fetchWorkshop.pending, (state) => { // состояние начального этапа загрузки
        state.status = 'loading';
      })
      .addCase(fetchWorkshop.fulfilled, (state, action) => { // состояние после успешной загрузки данных
        state.status = 'succeeded';
        state.workshop = action.payload; // сохранение состояния в поле workshop
      })
      .addCase(fetchWorkshop.rejected, (state, action) => { // состояние после ошибки
        state.status = 'failed';
        state.error = action.error.message; // сохранение сообщения состояния в поле error
      });


    builder
      .addCase(fetchWorkshopById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWorkshopById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentWorkshop = action.payload;
      })
      .addCase(fetchWorkshopById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default workshopSlice.reducer;