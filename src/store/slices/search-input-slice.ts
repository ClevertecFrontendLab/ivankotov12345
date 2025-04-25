import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from '../configure-store';

type SearchInputStateType = {
    searchInputValue: string;
};

const initialState: SearchInputStateType = {
    searchInputValue: '',
};

export const searchInputSlice = createSlice({
    name: 'searchInputSlice',
    initialState,
    reducers: {
        setSearchInputValue: (state, action: PayloadAction<string>) => {
            if (action.payload.length >= 3) {
                state.searchInputValue = action.payload;
            }
        },
    },
});

export const selectSearchInput = (state: ApplicationState) => state.searchInputSlice;
export const searchInputReducer = searchInputSlice.reducer;
export const { setSearchInputValue } = searchInputSlice.actions;
