import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import counterReducer from './slices/counterSlice';
import userReducer from './slices/user';
import contactsReducer from './slices/contacts'; 

export const API = createAPI();
export type APItype = typeof API;

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    contacts: contactsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: API,
      },
      serializableCheck: false,
    }),
  devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
