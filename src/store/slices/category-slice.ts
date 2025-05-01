import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NavMenuItem, Subcategory } from '~/types/nav-menu';

import { ApplicationState } from '../configure-store';

type CategoryStateType = {
    categories: NavMenuItem[];
    subCategories: Subcategory[];
};

const initialState: CategoryStateType = {
    categories: [],
    subCategories: [],
};

export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<NavMenuItem[]>) => {
            state.categories = action.payload;
        },
        setSubCategories: (state, action: PayloadAction<Subcategory[]>) => {
            state.subCategories = action.payload;
        },
    },
});

export const selectCategory = (state: ApplicationState) => state.categorySlice;
export const categoryReducer = categorySlice.reducer;
export const { setCategories, setSubCategories } = categorySlice.actions;
