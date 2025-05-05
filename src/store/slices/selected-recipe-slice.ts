import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from '../configure-store';

type SelectedRecipeStateType = {
    selectedRecipeTitle: string | null;
};

const initialState: SelectedRecipeStateType = {
    selectedRecipeTitle: null,
};

export const selectedRecipeSlice = createSlice({
    name: 'selectedRecipeSlice',
    initialState,
    reducers: {
        setSelectedRecipeTitle: (state, action: PayloadAction<string | null>) => {
            state.selectedRecipeTitle = action.payload;
        },
        clearSelectedRecipeTitle: (state) => {
            state.selectedRecipeTitle = null;
        },
    },
});

export const selectSelectedRecipe = (state: ApplicationState) => state.selectedRecipeSlice;
export const selectedRecipeReducer = selectedRecipeSlice.reducer;
export const { setSelectedRecipeTitle, clearSelectedRecipeTitle } = selectedRecipeSlice.actions;
