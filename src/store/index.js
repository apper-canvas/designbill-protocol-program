import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// Configure the Redux store
const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;