import { RootState } from '@redux/configure-store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MessageType } from '@typing/types/message-types';
import { FormInputValues } from '@typing/types/form-input-values';
import { AuthResponseType } from '@typing/types/response-types';

type AuthStateType = {
  isLoading: boolean,
  token: AuthResponseType | null,
  rememberMe: boolean,
  message?: MessageType,
  submittedData?: FormInputValues,
}

const initialState: AuthStateType = {
  isLoading: false,
  token: null,
  rememberMe: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getAuthFetch: (state, action: PayloadAction<FormInputValues>) => {
      state.isLoading = true;
      state.token = null;
      state.submittedData = action.payload;
    },
    getAuthSuccess: (state, action: PayloadAction<AuthResponseType>) => {
      state.isLoading = false;
      state.token = action.payload;
    },
    getAuthError: (state, action: PayloadAction<MessageType>) => {
      state.isLoading = false;
      state.token = null;
      state.message = action.payload;
    },
    getAuthGoogleFetch: (state) => {
      state.isLoading = true;
      state.rememberMe = true;
    },
    toggleRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
    clearAuth: (state) => {
      state.isLoading = false;
      state.token = null;
      state.message = undefined;
      state.submittedData = undefined;
      if (!state.rememberMe) {
        localStorage.removeItem('token');
      }
    }
  }
});

export const authSelect = (state: RootState) => state.auth;
export const authReducer = authSlice.reducer;
export const {
    getAuthFetch,
    getAuthSuccess,
    getAuthError,
    toggleRememberMe,
    getAuthGoogleFetch,
    clearAuth,
} = authSlice.actions;