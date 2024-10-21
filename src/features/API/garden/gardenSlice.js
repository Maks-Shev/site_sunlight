import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// функция для создания асинхронного запроса (thunk); axios библиотека для выполнения HTTP запросов, поддерживает более широкий диапозон браузеров
export const fetchGarden = createAsyncThunk('garden/fetchGarden', async () => {
	try {
		const response = await axios.get(
			'http://127.0.0.1:8000/api/kindergarten/garden/'
		);

		return response.data; // возвращение данных из ответа
	} catch (error) {
		if (error.response && error.response.status === 503) { // обработка ошибки полученной с сервера
			throw new Error('Сервис временно недоступен (503)');
		} else {
			throw new Error('Ошибка при получении списка сад');
		}
	}
});

export const fetchGardenById = createAsyncThunk('garden/fetchGardenById', async (id) => {
	try {
		const response = await axios.get(
			`http://127.0.0.1:8000/api/kindergarten/garden/${id}/`
		);

		return response.data;
	} catch (error) {
		if (error.response && error.response.status === 503) {
			throw new Error('Сервис временно недоступен (503)');
		} else {
			throw new Error(`Ошибка при получении данных сад с ID ${id}`);
		}
	}
});

const gardenSlice = createSlice({ // Функция для создания состояния
	name: 'garden',
	initialState: { // инициализация начального состояния
		garden: null, // переменная для храненния объекта
		currentGarden: null, // переменная для хранения текущего сада
		status: 'idle', // статус простоя, ожидание дальнейшего действия
		error: null // переменная для хранения сообщения об ошибке
	},
	reducers: {}, // функции для изменения состояния синхронно
	extraReducers: builder => { // функция для изменения состояния асинхронно
		builder
			.addCase(fetchGarden.pending, state => { // состояние начального этапа загрузки
				state.status = 'loading';
			})
			.addCase(fetchGarden.fulfilled, (state, action) => { // состояние после успешной загрузки данных
				state.status = 'succeeded';
				state.garden = action.payload; // сохранение состояния в поле garden
			})
			.addCase(fetchGarden.rejected, (state, action) => { // состояние после ошибки
				state.status = 'failed';
				state.error = action.error.message; // сохранение сообщения состояния в поле error
			});

		builder
			.addCase(fetchGardenById.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchGardenById.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.currentGarden = action.payload;
			})
			.addCase(fetchGardenById.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	}
});

export default gardenSlice.reducer;
