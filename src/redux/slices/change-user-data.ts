import { RootState } from '@redux/configure-store';
import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { UserDataValues } from '@typing/types/form-input-values';
import { MessageChangeUserData } from '@typing/types/message-types';


type ChangeUserDataStateType = {
  isLoading: boolean,
  userData: UserDataValues | null,
  message: MessageChangeUserData | null,
  isSuccess: boolean,
  isError: boolean,
}

const initialState: ChangeUserDataStateType = {
    isLoading: false,
    userData: null,
    message: null,
    isError: false,
    isSuccess: false,
}

export const changeUserDataSlice = createSlice({
  name: 'changeUserData',
  initialState,
  reducers: {
    changeUserDataFetch: (state, action: PayloadAction<UserDataValues>) => {
      state.isLoading = true;
      state.userData = action.payload;
    },
    changeUserDataSuccess: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    changeUserDataError: (state, action: PayloadAction<MessageChangeUserData>) => {
      state.isLoading = false;
      state.message = action.payload;
      state.isError = true;
    },
    clearUserDataError: (state) => {
      state.message = null;
      state.isError = false;
      state.isSuccess = false;
    }
  }
})

export const changeUserDataSelect = (state: RootState) => state.changeUserData;
export const changeUserDataReducer = changeUserDataSlice.reducer;
export const {
  changeUserDataFetch,
  changeUserDataSuccess,
  changeUserDataError,
  clearUserDataError,
} = changeUserDataSlice.actions;