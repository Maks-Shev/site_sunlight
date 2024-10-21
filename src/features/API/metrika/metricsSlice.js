import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const access_token = "y0_AgAAAAAucUo1AAxTCgAAAAETv-ZAAABgEnHSalNPZaex4JPrMVZdqjPNOQ";
const id = "98158002";

// Асинхронный thunk для получения данных с Яндекс Метрики
export const fetchMetrics = createAsyncThunk(
    'metrics/fetchMetrics',
    async ({ type, preset, dimensions, metrics }, { rejectWithValue }) => {
        try {
        const response = await axios.get('https://api-metrika.yandex.net/stat/v1/data', {
            headers: {
            Authorization: `OAuth ${access_token}`,
            },
            params: {
            preset,
            dimensions,
            ids: id,
            metrics,
            },
        });

        return { data: response.data, type };
        } catch (error) {
        return rejectWithValue({ error: error.response?.data || 'Error fetching metrics', type });
        }
    }
);

const initialState = {
    traffic: { data: null, status: 'idle', error: null },
    geo: { data: null, status: 'idle', error: null },
    deepness: { data: null, status: 'idle', error: null },
    deepnessTime: { data: null, status: 'idle', error: null },
    browsers: { data: null, status: 'idle', error: null },
    platforms: { data: null, status: 'idle', error: null },
    devices: { data: null, status: 'idle', error: null },
};

const metricsSlice = createSlice({
    name: 'metrics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(fetchMetrics.pending, (state, action) => {
            const { type } = action.meta.arg;
            if (state[type]) {
            state[type].status = 'loading';
            }
        })
        .addCase(fetchMetrics.fulfilled, (state, action) => {
            const { type, data } = action.payload;
            if (state[type]) {
            state[type].status = 'succeeded';
            state[type].data = data;
            }
        })
        .addCase(fetchMetrics.rejected, (state, action) => {
            const { type } = action.meta.arg;
            if (state[type]) {
            state[type].status = 'failed';
            state[type].error = action.payload.error;
            }
        });
    },
});

export default metricsSlice.reducer;