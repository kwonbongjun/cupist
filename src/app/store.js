import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../features/glam/profileSlice';
import userReducer from '../features/glam/userSlice';
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    user: userReducer,
  },
});
