import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// функция для создания асинхронного запроса (thunk); axios библиотека для выполнения HTTP запросов, поддерживает более широкий диапозон браузеров
export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/news/');

    return response.data.map((newsItem, index) => ({ // преобразуем полученные данные в нужный формат
      ...newsItem, // копируем все поля
      id: index + 1, // присваеваем id
    }));
  } catch (error) {
    if (error.response && error.response.status === 503) { // обработка ошибки полученной с сервера
      throw new Error('Сервис временно недоступен (503)');
    } else {
      throw new Error('Ошибка при получении списка новостей');
    }
  }
});

export const fetchNewsById = createAsyncThunk('news/fetchNewsById', async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/news/${id}/`);
    
    const newsWithId = { // переменная для заполненния id
      ...response.data, // развертывание данных из ответа
      id: id, // присвоение id
    };
    
    return newsWithId; // возвращение данных с полем id
  } catch (error) {
    if (error.response && error.response.status === 503) {
      throw new Error('Сервис временно недоступен (503)');
    } else if (error.response && error.response.status === 404) {
      throw new Error(`Новость с ID ${id} не найдена`);
    } else {
      throw new Error(`Ошибка при получении данных новости с ID ${id}`);
    }
  }
});

const newsSlice = createSlice({ // Функция для создания состояния
  name: 'news',
  initialState: { // инициализация начального состояния
    news: [], // массив для хранения данных
    currentNews: null, // переменная для хранения текущей новости
    status: 'idle', // статус простоя, ожидание дальнейшего действия
    error: null, // переменная для хранения сообщения об ошибке
  },
  reducers: {}, // функции для изменения состояния синхронно
  extraReducers: (builder) => { // функция для изменения состояния асинхронно
    builder
      .addCase(fetchNews.pending, (state) => { // состояние начального этапа загрузки
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => { // состояние после успешной загрузки данных
        state.status = 'succeeded';
        state.news = action.payload; // сохранение состояния в поле news
      })
      .addCase(fetchNews.rejected, (state, action) => { // состояние после ошибки
        state.status = 'failed';
        state.error = action.error.message; // сохранение сообщения состояния в поле error
      })
      
      .addCase(fetchNewsById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNewsById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentNews = action.payload;
      })
      .addCase(fetchNewsById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;