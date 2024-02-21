import { RootState } from '@redux/configure-store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { MessageType } from '@typing/types/message-types';
import { FormInputValues } from '@typing/types/form-input-values';

type RegistrationStateType = {
  isLoading: boolean,
  isSuccess: boolean,
  message: MessageType | null,
  submittedData?: FormInputValues,
};

const initialState: RegistrationStateType = {
    isLoading: false,
    isSuccess: false,
    message: null,
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    getRegistrationFetch: (state, action: PayloadAction<FormInputValues>) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.message = null;
      state.submittedData = action.payload;
    },
    getRegistrationSuccess: (state, action: PayloadAction<MessageType>) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    },
    getRegistrationError: (state, action: PayloadAction<MessageType>) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = action.payload;
    },
    clearRegistration: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = null;
    }
  }
});

export const registrationSelect = (state: RootState) => state.registration
export const registrationReducer = registrationSlice.reducer;
export const { 
    getRegistrationFetch,
    getRegistrationSuccess,
    getRegistrationError,
    clearRegistration
} = registrationSlice.actions;