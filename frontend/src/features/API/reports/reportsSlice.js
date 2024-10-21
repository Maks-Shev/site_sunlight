import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// функция для создания асинхронного запроса (thunk); axios библиотека для выполнения HTTP запросов, поддерживает более широкий диапозон браузеров
export const fetchReports = createAsyncThunk('reports/fetchReports', async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/reports/');
    
    return response.data; // возвращение данных из ответа
  } catch (error) {
    if (error.response && error.response.status === 503) { // обработка ошибки полученной с сервера
      throw new Error('Сервис временно недоступен (503)');
    } else {
      throw new Error('Ошибка при получении списка отчетов');
    }
  }
});

export const fetchReportsByType = createAsyncThunk('reports/fetchReportsByType', async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/reports/type_reports/`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 503) {
      throw new Error('Сервис временно недоступен (503)');
    } else {
      throw new Error(`Ошибка при получении данных отчета с Type ${type}`);
    }
  }
});

const reportsSlice = createSlice({ // Функция для создания состояния
  name: 'reports',
  initialState: { // инициализация начального состояния
    reports: [], // массив для хранения данных
    reportsByType: [], // массив для хранения данных о типе отчета
    status: 'idle', // статус простоя, ожидание дальнейшего действия
    statusByType: 'idle', // статус простоя, ожидание дальнейшего действия
    error: null, // переменная для хранения сообщения об ошибке
  },
  reducers: {}, // функции для изменения состояния синхронно
  extraReducers: (builder) => { // функция для изменения состояния асинхронно
    builder
    .addCase(fetchReports.pending, (state) => { // состояние начального этапа загрузки
      state.status = 'loading';
    })
    .addCase(fetchReports.fulfilled, (state, action) => { // состояние после успешной загрузки данных
      state.status = 'succeeded';
      state.reports = action.payload; // сохранение состояния в поле reports
    })
    .addCase(fetchReports.rejected, (state, action) => { // состояние после ошибки
      state.status = 'failed';
      state.error = action.error.message; // сохранение сообщения состояния в поле error
    });

    builder
      .addCase(fetchReportsByType.pending, (state) => {
        state.statusByType = 'loading';
      })
      .addCase(fetchReportsByType.fulfilled, (state, action) => {
        state.statusByType = 'succeeded';
        state.reportsByType = action.payload;
      })
      .addCase(fetchReportsByType.rejected, (state, action) => {
        state.statusByType = 'failed';
        state.error = action.error.message;
      });
  },
});

export default reportsSlice.reducer;