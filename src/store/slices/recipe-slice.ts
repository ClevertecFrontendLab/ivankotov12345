import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RecipeType } from '~/types/recipe';

import { ApplicationState } from '../configure-store';

type RecipesStateType = {
    currentRecipes: RecipeType[];
    filteredRecipes: RecipeType[];
};

const initialState: RecipesStateType = {
    currentRecipes: [],
    filteredRecipes: [],
};

export const recipeSlice = createSlice({
    name: 'recipe',
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

export const recipeReducer = recipeSlice.reducer;
export const selectRecipes = (state: ApplicationState) => state.recipe;

export const { setCurrentRecipes, setFilteredRecipes, clearFilterRecipes } = recipeSlice.actions;
