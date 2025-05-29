import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ToastStatus } from '~/types/toast-status';

import { ApplicationState } from '../configure-store';

type AppStateType = {
    isLoading: boolean;
    isResponseStatusOpen: boolean;
    isModalVerificationOpen: boolean;
    userId?: string;
    statusData?: ToastStatus;
};

const initialState: AppStateType = {
    isLoading: false,
    isModalVerificationOpen: false,
    isResponseStatusOpen: false,
};

export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setToastData: (state, action: PayloadAction<ToastStatus | undefined>) => {
            state.statusData = action.payload;
        },
        setToastIsOpen: (state, action: PayloadAction<boolean>) => {
            state.isResponseStatusOpen = action.payload;
        },
        setIsModalVerificationOpen: (state, action: PayloadAction<boolean>) => {
            state.isModalVerificationOpen = action.payload;
        },
        setUserId: (state, action: PayloadAction<string | undefined>) => {
            state.userId = action.payload;
        },
    },
});

export const selectApp = (state: ApplicationState) => state.appSlice;
export const selectModalVerification = (state: ApplicationState) =>
    state.appSlice.isModalVerificationOpen;
export const selectUserId = (state: ApplicationState) => state.appSlice.userId;

export const appReducer = appSlice.reducer;
export const { setIsLoading, setToastData, setToastIsOpen, setIsModalVerificationOpen, setUserId } =
    appSlice.actions;
