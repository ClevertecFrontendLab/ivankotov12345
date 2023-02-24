import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '..';

import { SortStateType, SortType } from './types';

export const sortSelect = (state: RootState) => state.sort

const initialState: SortStateType = {
    sortingType: SortType.RATING_UP_FIRST
}

export const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        sortingToggle: (state) => {
            state.sortingType = state.sortingType === SortType.RATING_UP_FIRST 
                ? SortType.RATING_LOW_FIRST 
                : SortType.RATING_UP_FIRST}
    }
})

export const sortReducer = sortSlice.reducer
export const { sortingToggle } = sortSlice.actions
