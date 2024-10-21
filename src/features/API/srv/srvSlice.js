import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// функция для создания асинхронного запроса (thunk); axios библиотека для выполнения HTTP запросов, поддерживает более широкий диапозон браузеров
export const fetchSrv = createAsyncThunk('srv/fetchSrv', async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/srv/srv_centre/');
    
    return response.data.results; // возвращение данных из ответа и автоматическое их сохранение в состояние
  } catch (error) {
    if (error.response && error.response.status === 503) { // обработка ошибки полученной с сервера
      throw new Error('Сервис временно недоступен (503)');
    } else {
      throw new Error('Ошибка при получении списка СРВ');
    }
  }
});

export const fetchSrvById = createAsyncThunk('srv/fetchSrvById', async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/srv/srv_centre/${id}/`);
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 503) {
      throw new Error('Сервис временно недоступен (503)');
    } else {
      throw new Error(`Ошибка при получении данных СРВ с ID ${id}`);
    }
  }
});

const srvSlice = createSlice({ // Функция для создания состояния
  name: 'srv',
  initialState: { // инициализация начального состояния
    srv: null, // переменная для храненния объекта
    currentSrv: null, // переменная для хранения текущего СРВ
    status: 'idle', // статус простоя, ожидание дальнейшего действия
    error: null, // переменная для хранения сообщения об ошибке
  },
  reducers: {}, // функции для изменения состояния синхронно
  extraReducers: (builder) => { // функция для изменения состояния асинхронно
    builder
      .addCase(fetchSrv.pending, (state) => { // состояние начального этапа загрузки
        state.status = 'loading';
      })
      .addCase(fetchSrv.fulfilled, (state, action) => { // состояние после успешной загрузки данных
        state.status = 'succeeded';
        state.srv = action.payload; // сохранение состояния в поле srv
      })
      .addCase(fetchSrv.rejected, (state, action) => { // состояние после ошибки
        state.status = 'failed';
        state.error = action.error.message; // сохранение сообщения состояния в поле error
      });


    builder
      .addCase(fetchSrvById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSrvById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentSrv = action.payload;
      })
      .addCase(fetchSrvById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default srvSlice.reducer;