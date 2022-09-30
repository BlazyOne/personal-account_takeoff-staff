import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { APItype } from '../store';
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

export const addContactItem = createAsyncThunk<
  ContactsItem,
  string,
  {
    extra: APItype
  }
>(
  'contacts/addContactItem',
  async (data, { rejectWithValue, extra: API }) => {
    try {
      const response: AxiosResponse<ContactsItem> = await API.post('/contacts', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

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

export const deleteContactItem = createAsyncThunk<
  number,
  number,
  {
    extra: APItype
  }
>(
  'contacts/deleteContactsItem',
  async (contactId, {rejectWithValue, extra: API}) => {
    try {
      await API.delete(`/contacts/${contactId}`);
      return contactId;
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

export const editConactItem = createAsyncThunk<
  ContactsItem,
  {
    contactId: number,
    jsonData: string
  },
  {
    extra: APItype
  }
>(
  'contacts/editConactItem',
  async (data, {rejectWithValue, extra: API}) => {
    try {
      const response: AxiosResponse<ContactsItem> = await API.put(`/contacts/${data.contactId}`, data.jsonData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

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