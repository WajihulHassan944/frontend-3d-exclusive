import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch geo data
export const fetchGeo = createAsyncThunk('geo/fetchGeo', async () => {
  const res = await fetch('https://ipwho.is/');
  const data = await res.json();
  return data; // store the whole response
});

const geoSlice = createSlice({
  name: 'geo',
  initialState: {
    data: null,       
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGeo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || null;
      })
      .addCase(fetchGeo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default geoSlice.reducer;
