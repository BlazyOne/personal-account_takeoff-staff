import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { downloadContactsData, addContactItem, deleteContactItem, editConactItem } from '../actions/contacts';

export interface ContactsItem {
  id: number
  userId: number
  name: string
  email?: string[]
  phone?: string[]
  address?: string[]
}

export interface ContactsState {
  contactsItems: ContactsItem[] | null
  isLoading: boolean
  error: string | null
}

const initialState: ContactsState = {
  contactsItems: null,
  isLoading: false,
  error: null,
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (
      state,
      action: PayloadAction<ContactsItem[]>
    ) => {
      state.contactsItems = action.payload;
      state.error = null;
    },
    clearContacts: (
      state
    ) => {
      state.contactsItems = null;
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      downloadContactsData.fulfilled,
      (
        state,
        action: PayloadAction<ContactsItem[]>
      ) => {
        state.contactsItems = action.payload;
        state.error = null;
      }
    );
    builder.addCase(
      addContactItem.fulfilled,
      (
        state,
        action: PayloadAction<ContactsItem>
      ) => {
        if (state.contactsItems) {
          state.contactsItems.push(action.payload);
        } else {
          state.contactsItems = [action.payload];
        }
      }
    );
    builder.addCase(
      deleteContactItem.fulfilled,
      (
        state,
        action: PayloadAction<number>
      ) => {
        if (state.contactsItems) {
          const index = state.contactsItems.findIndex((item) => {
            return item.id === action.payload;
          });

          state.contactsItems.splice(index, 1);
        }
      }
    );
    builder.addCase(
      editConactItem.fulfilled,
      (
        state,
        action: PayloadAction<ContactsItem>
      ) => {
        if (state.contactsItems) {
          const index = state.contactsItems.findIndex((item) => {
            return item.id === action.payload.id
          });

          state.contactsItems.splice(index, 1, action.payload);
        }
      }
    );
  }
});

export const { setContacts, clearContacts, addError, removeError } = contactsSlice.actions;

export const contactsItems = createSelector(
  (state: RootState) => state.contacts,
  (contacts) => contacts.contactsItems
);

export default contactsSlice.reducer;