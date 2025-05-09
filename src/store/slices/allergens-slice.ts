import { createSlice } from '@reduxjs/toolkit';

import { ApplicationState } from '../configure-store';

type AllergensStateType = {
    isDisabled: boolean;
};

const initialState: AllergensStateType = {
    isDisabled: true,
};

export const allergensSlice = createSlice({
    name: 'allergensSlice',
    initialState,
    reducers: {
        toggleAllergenDisabled: (state) => {
            state.isDisabled = !state.isDisabled;
        },
        setAllergenDisabled: (state) => {
            state.isDisabled = true;
        },
    },
});

export const selectAllergens = (state: ApplicationState) => state.allergensSlice;
export const allergensReducer = allergensSlice.reducer;
export const { toggleAllergenDisabled, setAllergenDisabled } = allergensSlice.actions;
