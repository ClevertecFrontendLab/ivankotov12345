import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getLocalStorageItem } from '~/helpers/storage-categories';
import { CATEGORY_STORAGE_KEY, SUBCATEGORY_STORAGE_KEY } from '~/query/constants/storage-keys';
import { NavMenuItem, Subcategory } from '~/types/nav-menu';

import { ApplicationState } from '../configure-store';

type CategoryStateType = {
    categories: NavMenuItem[];
    subCategories: Subcategory[];
};

const storageCategoryItem = getLocalStorageItem(CATEGORY_STORAGE_KEY);
const storageSubCategoryItem = getLocalStorageItem(SUBCATEGORY_STORAGE_KEY);

const initialState: CategoryStateType = {
    categories: storageCategoryItem,
    subCategories: storageSubCategoryItem,
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
export const selectCategories = (state: ApplicationState) => state.categorySlice.categories;

export const categoryReducer = categorySlice.reducer;
export const { setCategories, setSubCategories } = categorySlice.actions;
