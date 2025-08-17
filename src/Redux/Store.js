import { configureStore } from '@reduxjs/toolkit';
import { apiReducer } from './Slices/api.slice';



const store = configureStore({
  reducer: {
    api:apiReducer
  }
});

export default store;
