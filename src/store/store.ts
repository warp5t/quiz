import { configureStore } from '@reduxjs/toolkit';
import configCategoryReducer from '../slice/configSlice'

const rootReducer = {
  configSlice: configCategoryReducer,
}

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
