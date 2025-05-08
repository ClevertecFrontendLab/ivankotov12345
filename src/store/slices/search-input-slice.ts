import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from '../configure-store';

type SearchInputStateType = {
    searchInputValue: string;
    isSearching: boolean;
};

const initialState: SearchInputStateType = {
    searchInputValue: '',
    isSearching: false,
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
        clearSearchInputValue: (state) => {
            state.searchInputValue = '';
        },
        setIsSearching: (state, action: PayloadAction<boolean>) => {
            state.isSearching = action.payload;
        },
    },
});

export const selectSearchInput = (state: ApplicationState) => state.searchInputSlice;
export const searchInputReducer = searchInputSlice.reducer;
export const { setSearchInputValue, clearSearchInputValue, setIsSearching } =
    searchInputSlice.actions;
