import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// функция для создания асинхронного запроса (thunk); axios библиотека для выполнения HTTP запросов, поддерживает более широкий диапозон браузеров
export const fetchExperts = createAsyncThunk('experts/fetchExperts', async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/agents/experts/');
    
    return response.data; // возвращение данных из ответа
  } catch (error) {
    if (error.response && error.response.status === 503) { // обработка ошибки полученной с сервера
      throw new Error('Сервис временно недоступен (503)');
    } else {
      throw new Error('Ошибка при получении списка экспертов');
    }
  }
});

export const fetchExpertById = createAsyncThunk('experts/fetchExpertById', async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/agents/experts/${id}/`);
    
    const expertWithId = { // переменная для заполненния id
      ...response.data, // развертывание данных из ответа
      id: id, // присвоение id
    };
    
    return expertWithId; // возвращение данных с полем id
  } catch (error) {
    if (error.response && error.response.status === 503) {
      throw new Error('Сервис временно недоступен (503)');
    } else {
      throw new Error(`Ошибка при получении данных эксперта с ID ${id}`);
    }
  }
});

const expertsSlice = createSlice({ // Функция для создания состояния
  name: 'experts',
  initialState: { // инициализация начального состояния
    experts: [], // массив для хранения данных
    currentExpert: null, // переменная для хранения текущего эксперта
    status: 'idle', // статус простоя, ожидание дальнейшего действия
    error: null, // переменная для хранения сообщения об ошибке
  },
  reducers: {}, // функции для изменения состояния синхронно
  extraReducers: (builder) => { // функция для изменения состояния асинхронно
    builder
      .addCase(fetchExperts.pending, (state) => { // состояние начального этапа загрузки
        state.status = 'loading';
      })
      .addCase(fetchExperts.fulfilled, (state, action) => { // состояние после успешной загрузки данных
        state.status = 'succeeded';
        state.experts = action.payload; // сохранение состояния в поле experts
      })
      .addCase(fetchExperts.rejected, (state, action) => { // состояние после ошибки
        state.status = 'failed';
        state.error = action.error.message; // сохранение сообщения состояния в поле error
      });


    builder
      .addCase(fetchExpertById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExpertById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentExpert = action.payload;
      })
      .addCase(fetchExpertById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default expertsSlice.reducer;