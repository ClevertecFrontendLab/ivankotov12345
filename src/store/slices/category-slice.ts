import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NavMenuItem } from '~/types/nav-menu';

import { ApplicationState } from '../configure-store';

type CategoryStateType = {
    categories: NavMenuItem[];
};

const initialState: CategoryStateType = {
    categories: [],
};

export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<NavMenuItem[]>) => {
            state.categories = action.payload;
        },
    },
});

export const selectCategory = (state: ApplicationState) => state.categorySlice;
export const categoryReducer = categorySlice.reducer;
export const { setCategories } = categorySlice.actions;
