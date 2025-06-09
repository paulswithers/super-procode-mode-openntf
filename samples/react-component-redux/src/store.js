/**
 * (C) 2024, HCL, Apache-2.0 License
 * All ratings will be managed here
 */
import { configureStore } from '@reduxjs/toolkit';
import ratingReducer from './components/ratingSlice';

export const store = configureStore({
  reducer: {
    ratingStore: ratingReducer
  }
});
