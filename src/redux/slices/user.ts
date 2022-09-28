import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { login, checkAuthorization } from '../actions/user';

export interface CurrentUser {
  id: number,
  name: string,
  email: string,
  password: string
}

export interface UserState {
  currentUser: CurrentUser | null
  isLoading: boolean
  checkingAuth: boolean
  error: string | null
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  checkingAuth: false,
  error: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<CurrentUser>
    ) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    clearUser: (
      state
    ) => {
      if (localStorage.getItem('user_id')) localStorage.removeItem('user_id');
      state.currentUser = null;
      state.error = null;
    },
    addError: (
      state,
      action: PayloadAction<string>
    ) => {
      state.error = action.payload;
    },
    removeError: (
      state
    ) => {
      state.error = null;
    },
    setCheckingAuth: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.checkingAuth = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (
        state,
        action: PayloadAction<CurrentUser>
      ) => {
        state.currentUser = action.payload;
        state.isLoading = false;
        state.error = null;
        state.checkingAuth = false;
      }
    );
    builder.addCase(
      checkAuthorization.fulfilled,
      (
        state,
        action: PayloadAction<CurrentUser | null>
      ) => {
        state.currentUser = action.payload;
        state.isLoading = false;
        state.error = null;
        state.checkingAuth = false;
      }
    );
  }
});

export const { addError, removeError, setUser, clearUser, setCheckingAuth } = userSlice.actions

export const currentUser = createSelector(
  (state: RootState) => state.user,
  (user) => user.currentUser
);

export const errorValue = createSelector(
  (state: RootState) => state.user,
  (user) => user.error
);

export default userSlice.reducer;