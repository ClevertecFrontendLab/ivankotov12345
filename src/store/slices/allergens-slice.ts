import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from '../configure-store';

type AllergensStateType = {
    selectedAllergensList: string[];
    isDisabled: boolean;
};

const initialState: AllergensStateType = {
    selectedAllergensList: [],
    isDisabled: true,
};

export const allergensSlice = createSlice({
    name: 'allergensSlice',
    initialState,
    reducers: {
        toggleAllergenDisabled: (state) => {
            state.isDisabled = !state.isDisabled;
        },
        addAllergen: (state, action: PayloadAction<string>) => {
            const allergen = action.payload.trim().toLowerCase();

            state.selectedAllergensList.push(allergen);
        },
        removeAllergen: (state, action: PayloadAction<string>) => {
            state.selectedAllergensList = state.selectedAllergensList.filter(
                (allergen) => allergen !== action.payload,
            );
        },
        clearAllergens: (state) => {
            state.selectedAllergensList = [];
            state.isDisabled = true;
        },
    },
});

export const selectAllergens = (state: ApplicationState) => state.allergensSlice;
export const allergensReducer = allergensSlice.reducer;
export const { addAllergen, removeAllergen, toggleAllergenDisabled, clearAllergens } =
    allergensSlice.actions;
