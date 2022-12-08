import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import services from '../api/services';

export const fetchData = createAsyncThunk('apiData/fetchByUrl', async (url) => {
  const data = await services.getData(url);
  return { data, url };
});

const apiFetchSlice = createSlice({
  name: 'apiData',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      return { ...state, [action.payload.url]: action.payload.data };
    });
  },
});

const { reducer: apiData } = apiFetchSlice;
export default apiData;
