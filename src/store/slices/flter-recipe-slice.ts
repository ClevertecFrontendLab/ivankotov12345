import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RecipeType } from '~/types/recipe';

import { ApplicationState } from '../configure-store';

type FilterRecipesStateType = {
    filteredRecipes: RecipeType[];
};

const initialState: FilterRecipesStateType = {
    filteredRecipes: [],
};

export const filterRecipeSlice = createSlice({
    name: 'filterRecipe',
    initialState,
    reducers: {
        setFilteredRecipes: (state, action: PayloadAction<RecipeType[]>) => {
            state.filteredRecipes = action.payload;
        },
        clearFilterRecipes: (state) => {
            state.filteredRecipes = [];
        },
    },
});

export const filterRecipeReducer = filterRecipeSlice.reducer;
export const selectFilteredRecipes = (state: ApplicationState) => state.filterRecipe;

export const { setFilteredRecipes, clearFilterRecipes } = filterRecipeSlice.actions;
