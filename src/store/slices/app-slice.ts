import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from '../configure-store';

type AppStateType = {
    isLoading: boolean;
};

const initialState: AppStateType = {
    isLoading: false,
};

export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const selectApp = (state: ApplicationState) => state.appSlice;
export const appReducer = appSlice.reducer;
export const { setIsLoading } = appSlice.actions;
