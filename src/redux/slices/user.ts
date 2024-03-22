import { RootState } from '@redux/configure-store';
import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { UserResponseType } from '@typing/types/response-types';

type UserStateType = {
  isLoading: boolean,
  userData: UserResponseType | null,
}

const initialState: UserStateType = {
  isLoading: false,
  userData: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserFetch: (state) => {
      state.isLoading = true;
    },
    getUserSuccss: (state, action: PayloadAction<UserResponseType>) => {
      state.isLoading = false;
      state.userData = action.payload;
    },
    getUserError: (state) => {
      state.isLoading = false;
    },
  }
});

export const userReducer = userSlice.reducer;
export const userSelect = (state: RootState) => state.user;
export const { getUserFetch, getUserSuccss, getUserError } = userSlice.actions;