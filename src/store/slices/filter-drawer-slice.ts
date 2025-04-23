import { createSlice } from '@reduxjs/toolkit';

import { ApplicationState } from '../configure-store';

type FilterDrawerStateType = {
    isOpen: boolean;
};

const initialState: FilterDrawerStateType = {
    isOpen: false,
};

export const filterDrawerSlice = createSlice({
    name: 'filterDrawerSlice',
    initialState,
    reducers: {
        openDrawer: (state) => {
            state.isOpen = true;
        },
        closeDrawer: (state) => {
            state.isOpen = false;
        },
    },
});

export const selectFilterDrawer = (state: ApplicationState) => state.filterDrawerSlice;
export const filterDrawerReducer = filterDrawerSlice.reducer;
export const { openDrawer, closeDrawer } = filterDrawerSlice.actions;
