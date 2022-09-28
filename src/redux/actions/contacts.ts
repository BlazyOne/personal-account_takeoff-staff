import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { APItype, RootState } from '../store';
import { ContactsItem } from '../slices/contacts';

export const downloadContactsData = createAsyncThunk<
  ContactsItem[],
  number,
  {
    extra: APItype
  }
>(
  'contacts/downloadContactsData',
  async (userId, { rejectWithValue, extra: API }) => {
    try {
      const response: AxiosResponse<ContactsItem[]> = await API.get(`/contacts?userId=${userId}`);

      return response.data;
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