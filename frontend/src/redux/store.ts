import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import baseApi from './api/baseClient';
import toastReducer from './slices/toast';
import userReducer from './slices/user';

export const store = configureStore({
  reducer: {
    user: userReducer,
    toast: toastReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
