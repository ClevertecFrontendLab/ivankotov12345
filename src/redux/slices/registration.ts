import { RootState } from '@redux/configure-store';
import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { FormInputValues } from '@typing/types/form-input-values';
import { MessageType } from '@typing/types/message-types';

type RegistrationStateType = {
  isLoading: boolean,
  isSuccess: boolean,
  message?: MessageType,
  submittedData?: FormInputValues,
};

const initialState: RegistrationStateType = {
    isLoading: false,
    isSuccess: false,
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    getRegistrationFetch: (state, action: PayloadAction<FormInputValues>) => {
      state.isLoading = true;
      state.isSuccess = false;
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
      state.message = undefined;
      state.submittedData = undefined;
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