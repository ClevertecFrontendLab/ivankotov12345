import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RecipeType } from '~/types/recipe';

import { ApplicationState } from '../configure-store';

type FilterRecipesStateType = {
    filteredRecipes: RecipeType[];
    isFiltered: boolean;
};

const initialState: FilterRecipesStateType = {
    filteredRecipes: [],
    isFiltered: false,
};

export const filterRecipeSlice = createSlice({
    name: 'filterRecipe',
    initialState,
    reducers: {
        setFilteredRecipes: (state, action: PayloadAction<RecipeType[]>) => {
            state.filteredRecipes = action.payload;
            state.isFiltered = action.payload.length > 0;
        },
        clearFilterRecipes: (state) => {
            state.filteredRecipes = [];
            state.isFiltered = false;
        },
    },
});

export const filterRecipeReducer = filterRecipeSlice.reducer;
export const selectFilteredRecipes = (state: ApplicationState) => state.filterRecipe;

export const { setFilteredRecipes, clearFilterRecipes } = filterRecipeSlice.actions;
