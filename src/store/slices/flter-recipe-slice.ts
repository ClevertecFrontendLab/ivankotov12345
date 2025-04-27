import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RecipeType } from '~/types/recipe';

import { ApplicationState } from '../configure-store';

type FilterRecipesStateType = {
    currentRecipes: RecipeType[];
    filteredRecipes: RecipeType[];
};

const initialState: FilterRecipesStateType = {
    currentRecipes: [],
    filteredRecipes: [],
};

export const filterRecipeSlice = createSlice({
    name: 'filterRecipe',
    initialState,
    reducers: {
        setCurrentRecipes: (state, action: PayloadAction<RecipeType[]>) => {
            state.currentRecipes = action.payload;
        },
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

export const { setCurrentRecipes, setFilteredRecipes, clearFilterRecipes } =
    filterRecipeSlice.actions;
