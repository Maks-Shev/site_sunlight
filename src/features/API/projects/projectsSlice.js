import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// функция для создания асинхронного запроса (thunk); axios библиотека для выполнения HTTP запросов, поддерживает более широкий диапозон браузеров
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/sun_projects/projects/');
    return response.data.results; // возвращение данных из ответа и автоматическое их сохранение в состояние
  } catch (error) {
    if (error.response && error.response.status === 503) { // обработка ошибки полученной с сервера
      throw new Error('Сервис временно недоступен (503)');
    } else {
      throw new Error('Ошибка при получении списка проектов');
    }
  }
});

export const fetchProjectsById = createAsyncThunk('projects/fetchProjectsById', async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/sun_projects/projects/${id}/`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 503) {
      throw new Error('Сервис временно недоступен (503)');
    } else {
      throw new Error(`Ошибка при получении данных проекта с ID ${id}`);
    }
  }
});

const projectsSlice = createSlice({ // Функция для создания состояния
  name: 'projects',
  initialState: { // инициализация начального состояния
    projects: [], // массив для хранения данных
    status: 'idle', // статус простоя, ожидание дальнейшего действия
    error: null, // переменная для хранения сообщения об ошибке
  },
  reducers: {}, // функции для изменения состояния синхронно
  extraReducers: (builder) => { // функция для изменения состояния асинхронно
    builder
      .addCase(fetchProjects.pending, (state) => { // состояние начального этапа загрузки
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => { // состояние после успешной загрузки данных
        state.status = 'succeeded';
        state.projects = action.payload; // сохранение состояния в поле projects
      })
      .addCase(fetchProjects.rejected, (state, action) => { // состояние после ошибки
        state.status = 'failed';
        state.error = action.error.message; // сохранение сообщения состояния в поле error
      });

    builder
      .addCase(fetchProjectsById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjectsById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjectsById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default projectsSlice.reducer;