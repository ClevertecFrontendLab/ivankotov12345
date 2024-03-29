import { RootState } from '@redux/configure-store';
import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { UserResponseType } from '@typing/types/response-types';

type UserStateType = {
  isLoading: boolean,
  userData: UserResponseType | null,
  readyForJoint: boolean,
  sendNotification: boolean,
}

const initialState: UserStateType = {
  isLoading: false,
  userData: null,
  readyForJoint: false,
  sendNotification: false
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
      state.readyForJoint = action.payload.readyForJointTraining;
      state.sendNotification = action.payload.sendNotification;
    },
    getUserError: (state) => {
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.userData = null;
    },
    toggleReadyForJoint: (state, action: PayloadAction<boolean>) => {
      state.readyForJoint = action.payload;
    },
    toggleSendNotigication: (state, action: PayloadAction<boolean>) => {
      state.sendNotification = action.payload;
    },
  }
});

export const userReducer = userSlice.reducer;
export const userSelect = (state: RootState) => state.user;
export const {
  getUserFetch,
  getUserSuccss,
  getUserError,
  clearUser,
  toggleReadyForJoint,
  toggleSendNotigication,
} = userSlice.actions;