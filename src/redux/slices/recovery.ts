import { RootState } from '@redux/configure-store';
import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { FormRecoveryInputEmail, FormRecoveryInputValues, FromRecoveryConfirmEmail } from '@typing/types/form-input-values';
import { MessageType } from '@typing/types/message-types';

type RecoveryStateType = {
    isLoading: boolean,
    isForgotSuccess: boolean,
    isConfirmEmailSuccess: boolean,
    isConfirmEmailError: boolean,
    isResetSuccess: boolean,
    message?: MessageType,
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
}

export const recoverySlice = createSlice({
  name: 'recovery',
  initialState,
  reducers: {
    getForgotPassFetch: (state, action: PayloadAction<FormRecoveryInputEmail>) => {
      state.isLoading = true;
      state.isForgotSuccess = false;
      state.submittedEmail = action.payload;
    },
    getForgotPassSuccess: (state) => {
      state.isLoading = false;
      state.isForgotSuccess = true;
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
      state.submittedCode = action.payload;
    },
    getConfirmEmailSuccess: (state) => {
      state.isLoading = false;
      state.isConfirmEmailSuccess = true;
      state.isConfirmEmailError = false;
    },
    getConfirmEmailError: (state) => {
      state.isLoading = false;
      state.isConfirmEmailSuccess = false;
      state.isConfirmEmailError = true;
    },
    getResetPasswordFetch: (state, action: PayloadAction<FormRecoveryInputValues>) => {
      state.isLoading = true;
      state.isResetSuccess = false;
      state.submittedNewPass = action.payload;
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
    clearRecovery: (state) => {
      state.isLoading = false;
      state.isForgotSuccess = false;
      state.submittedEmail = null;
      state.submittedCode = null;
      state.submittedNewPass = null;
      state.isConfirmEmailSuccess = false;
      state.isConfirmEmailError = false;
      state.isResetSuccess = false;
    }
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
    clearRecovery,
} = recoverySlice.actions;
export const recoveryReducer = recoverySlice.reducer;