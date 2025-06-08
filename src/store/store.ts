import { configureStore } from '@reduxjs/toolkit'
import configCategoryReducer from '../slice/initialSlice/configSliceInit'
import configStartReducer from '../slice/startSlice/configSliceStart'
import configProgressSlice from '../slice/progressSlice/progressSlice'

const rootReducer = {
  configSliceInitial: configCategoryReducer,
  configSliceStart: configStartReducer,
  configSliceProgress: configProgressSlice
}

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
