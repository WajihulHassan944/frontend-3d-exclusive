import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import websiteMediaReducer from './features/websiteMedia';
import geoReducer from './features/geoSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    websiteMedia: websiteMediaReducer,
    geo: geoReducer,
  },
});
