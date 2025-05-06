import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ErrorType } from '~/types/error-type';

import { ApplicationState } from '../configure-store';

type AppStateType = {
    isLoading: boolean;
    isErrorAlertOpen: boolean;
    errorData?: ErrorType;
};

const initialState: AppStateType = {
    isLoading: false,
    isErrorAlertOpen: false,
};

export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setErrorData: (state, action: PayloadAction<ErrorType | undefined>) => {
            state.errorData = action.payload;
        },
        setErrorAlertIsOpen: (state, action: PayloadAction<boolean>) => {
            state.isErrorAlertOpen = action.payload;
        },
    },
});

export const selectApp = (state: ApplicationState) => state.appSlice;
export const appReducer = appSlice.reducer;
export const { setIsLoading, setErrorData, setErrorAlertIsOpen } = appSlice.actions;
