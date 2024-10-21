import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// функция для создания асинхронного запроса (thunk); axios библиотека для выполнения HTTP запросов, поддерживает более широкий диапозон браузеров
export const fetchPartners = createAsyncThunk('partners/fetchPartners', async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/agents/partners/');
    
    return response.data; // возвращение данных из ответа
  } catch (error) {
    if (error.response && error.response.status === 503) { // обработка ошибки полученной с сервера
      throw new Error('Сервис временно недоступен (503)');
    } else {
      throw new Error('Ошибка при получении списка партнеров');
    }
  }
});

export const fetchPartnersById = createAsyncThunk('partners/fetchPartnersById', async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/agents/partners/${id}/`);
    
    const partnersWithId = { // переменная для заполненния id
      ...response.data, // развертывание данных из ответа
      id: id, // присвоение id
    };
    
    return partnersWithId; // возвращение данных с полем id
  } catch (error) {
    if (error.response && error.response.status === 503) {
      throw new Error('Сервис временно недоступен (503)');
    } else {
      throw new Error(`Ошибка при получении данных партнера с ID ${id}`);
    }
  }
});

const partnersSlice = createSlice({ // Функция для создания состояния
  name: 'partners',
  initialState: { // инициализация начального состояния
    partners: [], // массив для хранения данных
    currentPartners: null, // переменная для хранения текущего партнера
    status: 'idle', // статус простоя, ожидание дальнейшего действия
    error: null, // переменная для хранения сообщения об ошибке
  },
  reducers: {}, // функции для изменения состояния синхронно
  extraReducers: (builder) => { // функция для изменения состояния асинхронно
    builder
      .addCase(fetchPartners.pending, (state) => { // состояние начального этапа загрузки
        state.status = 'loading';
      })
      .addCase(fetchPartners.fulfilled, (state, action) => { // состояние после успешной загрузки данных
        state.status = 'succeeded';
        state.partners = action.payload; // сохранение состояния в поле partners
      })
      .addCase(fetchPartners.rejected, (state, action) => { // состояние после ошибки
        state.status = 'failed';
        state.error = action.error.message; // сохранение сообщения состояния в поле error
      });


    builder
      .addCase(fetchPartnersById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPartnersById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentPartners = action.payload;
      })
      .addCase(fetchPartnersById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default partnersSlice.reducer;