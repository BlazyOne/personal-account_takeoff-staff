import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { LoginValues } from '../../components/AuthForm';
import { APItype, RootState } from '../store';
import { CurrentUser, setCheckingAuth } from '../slices/user';

export const login = createAsyncThunk<
  CurrentUser,
  LoginValues,
  {
    extra: APItype
  }
>(
  'user/login',
  async (data, { rejectWithValue, extra: API }) => {
    try {
      const response: AxiosResponse<CurrentUser[]> = await API.get(`/users?email=${data.email}&password=${data.password}`);
      // console.log(response.data);

      if (response.data.length) {
        localStorage.setItem('user_id', `${response.data[0].id}`);
        return response.data[0];
      } else {
        return rejectWithValue('Wrong email or password');
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e?.response?.statusText) {
        return rejectWithValue(e?.response?.statusText);
      }

      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }

      throw e;
    }
  }
);

export const checkAuthorization = createAsyncThunk<
  CurrentUser | null,
  undefined,
  {
    state: RootState
    extra: APItype
  }
>(
  'user/checkAuthorization',
  async (data, { getState, dispatch, rejectWithValue, extra: API}) => {
    const { user } = getState()
    if (user.checkingAuth) return user.currentUser;

    const userId = localStorage.getItem('user_id');

    try {
      if (userId) {
        dispatch(setCheckingAuth(true))
        const response: AxiosResponse<CurrentUser> = await API.get(`/users/${userId}`);
        return response.data;
      }
      return rejectWithValue('Not logged in');
    } catch(e) {
      if (axios.isAxiosError(e) && e?.response?.statusText) {
        return rejectWithValue(e?.response?.statusText);
      }

      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }

      throw e;
    }
  }
);