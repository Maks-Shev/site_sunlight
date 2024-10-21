import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// функция для создания асинхронного запроса (thunk); axios библиотека для выполнения HTTP запросов, поддерживает более широкий диапозон браузеров
export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/agents/contacts/');
  return response.data; // возвращение данных из ответа
});

const contactsSlice = createSlice({ // Функция для создания состояния
    name: 'contacts',
    initialState: { // инициализация начального состояния
      contact: null, // переменная для храненния объекта
      status: 'idle', // статус простоя, ожидание дальнейшего действия
      error: null, // переменная для хранения сообщения об ошибке
    },
    reducers: {}, // функции для изменения состояния синхронно
    extraReducers: (builder) => { // функция для изменения состояния асинхронно
      builder
        .addCase(fetchContacts.pending, (state) => { // состояние начального этапа загрузки
          state.status = 'loading';
        })
        .addCase(fetchContacts.fulfilled, (state, action) => { // состояние после успешной загрузки данных
          state.status = 'succeeded';
          state.contact = action.payload; // сохранение состояния в поле contact
        })
        .addCase(fetchContacts.rejected, (state, action) => { // состояние после ошибки
          state.status = 'failed';
          state.error = action.error.message; // сохранение сообщения состояния в поле error
        });
    },
  });

export default contactsSlice.reducer;