import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '@/const';

export const fetchWebsiteMedia = createAsyncThunk(
  'websiteMedia/fetchWebsiteMedia',
  async () => {
    const response = await fetch(`${baseUrl}/media/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch media');
    }
    const data = await response.json();
    return data.media || [];
  }
);

const initialState = {
  media: [],
  loading: false,
  error: null,
};

const websiteMediaSlice = createSlice({
  name: 'websiteMedia',
  initialState,
  reducers: {
    setMedia: (state, action) => {
      state.media = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWebsiteMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWebsiteMedia.fulfilled, (state, action) => {
        state.media = action.payload;
        state.loading = false;
      })
      .addCase(fetchWebsiteMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setMedia } = websiteMediaSlice.actions;
export default websiteMediaSlice.reducer;
