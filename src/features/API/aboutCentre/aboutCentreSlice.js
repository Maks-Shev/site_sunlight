import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// функция для создания асинхронного запроса (thunk); axios библиотека для выполнения HTTP запросов, поддерживает более широкий диапозон браузеров
export const fetchAboutCentre = createAsyncThunk('about_centre/fetchAboutCentre', async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/communications/article_about_centre/');
    return response.data.results; // возвращение данных из ответа и автоматическое их сохранение в состояние
  } catch (error) {
    if (error.response && error.response.status === 503) { // обработка ошибки полученной с сервера
      throw new Error('Сервис временно недоступен (503)');
    } else {
      throw new Error('Ошибка при получении списка статей');
    }
  }
});

export const fetchAboutCentreById = createAsyncThunk('about_centre/fetchAboutCentreId', async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/communications/article_about_centre/${id}/`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 503) {
      throw new Error('Сервис временно недоступен (503)');
    } else {
      throw new Error(`Ошибка при получении данных статей с ID ${id}`);
    }
  }
});

const AboutCentreSlice = createSlice({  // Функция для создания состояния
  name: 'about',
  initialState: { // инициализация начального состояния
    about: [], // массив для хранения данных
    status: 'idle', // статус простоя, ожидание дальнейшего действия
    error: null, // переменная для хранения сообщения об ошибке
  },
  reducers: {}, // функции для изменения состояния синхронно
  extraReducers: (builder) => { // функция для изменения состояния асинхронно
    builder
    .addCase(fetchAboutCentre.pending, (state) => { // состояние начального этапа загрузки
      state.status = 'loading';
    })
    .addCase(fetchAboutCentre.fulfilled, (state, action) => { // состояние после успешной загрузки данных
      state.status = 'succeeded';
      state.about = action.payload; // сохранение состояния в поле about
    })
    .addCase(fetchAboutCentre.rejected, (state, action) => { // состояние после ошибки
      state.status = 'failed';
      state.error = action.error.message; // сохранение сообщения состояния в поле error
    });

    builder
      .addCase(fetchAboutCentreById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAboutCentreById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.about = action.payload;
      })
      .addCase(fetchAboutCentreById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default AboutCentreSlice.reducer;