import { RootState } from '@redux/configure-store';
import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { UserDataValues } from '@typing/types/form-input-values';


type ChangeUserDataStateType = {
  isLoading: boolean,
  userData: UserDataValues | null,
}

const initialState: ChangeUserDataStateType = {
    isLoading: false,
    userData: null,
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
    },
    changeUserDataError: (state) => {
      state.isLoading = false;
    },
  }
})

export const changeUserDataSelect = (state: RootState) => state.changeUserData;
export const changeUserDataReducer = changeUserDataSlice.reducer;
export const {
  changeUserDataFetch,
  changeUserDataSuccess,
  changeUserDataError,
} = changeUserDataSlice.actions;