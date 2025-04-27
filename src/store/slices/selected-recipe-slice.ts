import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RecipeType } from '~/types/recipe';

import { ApplicationState } from '../configure-store';

type SelectedRecipeStateType = {
    selectedRecipe: RecipeType | null;
};

const initialState: SelectedRecipeStateType = {
    selectedRecipe: null,
};

export const selectedRecipeSlice = createSlice({
    name: 'selectedRecipeSlice',
    initialState,
    reducers: {
        setSelectedRecipe: (state, action: PayloadAction<RecipeType | null>) => {
            state.selectedRecipe = action.payload;
        },
        clearSelectedRecipe: (state) => {
            state.selectedRecipe = null;
        },
    },
});

export const selectSelectedRecipe = (state: ApplicationState) => state.selectedRecipeSlice;
export const selectedRecipeReducer = selectedRecipeSlice.reducer;
export const { setSelectedRecipe, clearSelectedRecipe } = selectedRecipeSlice.actions;
