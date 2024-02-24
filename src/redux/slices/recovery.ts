import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@redux/configure-store';
import { MessageType } from '@typing/types/message-types';
import { FormRecoveryInputEmail, FormRecoveryInputValues, FromRecoveryConfirmEmail } from '@typing/types/form-input-values';

type RecoveryStateType = {
    isLoading: boolean,
    isForgotSuccess: boolean,
    isConfirmEmailSuccess: boolean,
    isConfirmEmailError: boolean,
    isResetSuccess: boolean,
    message: MessageType | null,
    submittedEmail: FormRecoveryInputEmail | null,
    submittedCode: FromRecoveryConfirmEmail | null,
    submittedNewPass: FormRecoveryInputValues | null,
}

const initialState: RecoveryStateType = {
    isLoading: false,
    isForgotSuccess: false,
    submittedEmail: null,
    submittedCode: null,
    submittedNewPass: null,
    isConfirmEmailSuccess: false,
    isConfirmEmailError: false,
    isResetSuccess: false,
    message: null,
}

export const recoverySlice = createSlice({
  name: 'recovery',
  initialState,
  reducers: {
    getForgotPassFetch: (state, action: PayloadAction<FormRecoveryInputEmail>) => {
      state.isLoading = true;
      state.isForgotSuccess = false;
      state.message = null;
      state.submittedEmail = action.payload;
    },
    getForgotPassSuccess: (state) => {
      state.isLoading = false;
      state.isForgotSuccess = true;
      state.message = null;
    },
    getForgotPassError: (state, action: PayloadAction<MessageType>) => {
      state.isLoading = false;
      state.isForgotSuccess = false;
      state.message = action.payload;
    },
    getConfirmEmailFetch: (state, action: PayloadAction<FromRecoveryConfirmEmail>) => {
      state.isLoading = true;
      state.isConfirmEmailSuccess = false;
      state.isConfirmEmailError = false;
      state.message = null;
      state.submittedCode = action.payload;
    },
    getConfirmEmailSuccess: (state) => {
      state.isLoading = false;
      state.isConfirmEmailSuccess = true;
      state.isConfirmEmailError = false;
      state.message = null;
    },
    getConfirmEmailError: (state) => {
      state.isLoading = false;
      state.isConfirmEmailSuccess = false;
      state.isConfirmEmailError = true;
      state.message = null;
    },
    getResetPasswordFetch: (state, action: PayloadAction<FormRecoveryInputValues>) => {
      state.isLoading = true;
      state.isResetSuccess = false;
      state.submittedNewPass = action.payload;
      state.message = null;
    },
    getResetPasswordSuccess: (state, action: PayloadAction<MessageType>) => {
      state.isLoading = false;
      state.isResetSuccess = true;
      state.message = action.payload;
    },
    getResetPasswordError: (state, action: PayloadAction<MessageType>) => {
      state.isLoading = false;
      state.isResetSuccess = false;
      state.message = action.payload;
    },
  }
})

export const recoverySelect = (state: RootState) => state.recovery;
export const { 
    getForgotPassFetch,
    getForgotPassSuccess,
    getForgotPassError,
    getConfirmEmailFetch,
    getConfirmEmailSuccess,
    getConfirmEmailError,
    getResetPasswordFetch,
    getResetPasswordSuccess,
    getResetPasswordError,
} = recoverySlice.actions;
export const recoveryReducer = recoverySlice.reducer;