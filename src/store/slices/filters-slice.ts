import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from '../configure-store';

type FiltersStateType = {
    selectedAllergens: string[];
    selectedCategories: string[];
    selectedAuthors: string[];
    selectedMeatTypes: string[];
    selectedSidesTypes: string[];
};

const initialState: FiltersStateType = {
    selectedAllergens: [],
    selectedCategories: [],
    selectedAuthors: [],
    selectedMeatTypes: [],
    selectedSidesTypes: [],
};

export const filtersSlice = createSlice({
    name: 'filtersSlice',
    initialState,
    reducers: {
        addAllergen: (state, action: PayloadAction<string>) => {
            const allergen = action.payload.trim().toLowerCase();

            state.selectedAllergens.push(allergen);
        },
        removeAllergen: (state, action: PayloadAction<string>) => {
            state.selectedAllergens = state.selectedAllergens.filter(
                (allergen) => allergen !== action.payload,
            );
        },
        addCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategories.push(action.payload);
        },
        removeCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategories.filter((item) => item !== action.payload);
        },
        addAuthor: (state, action: PayloadAction<string>) => {
            state.selectedAuthors.push(action.payload);
        },
        removeAuthor: (state, action: PayloadAction<string>) => {
            state.selectedAuthors.filter((item) => item !== action.payload);
        },
        addMeat: (state, action: PayloadAction<string>) => {
            state.selectedMeatTypes.push(action.payload);
        },
        removeMeat: (state, action: PayloadAction<string>) => {
            state.selectedMeatTypes = state.selectedMeatTypes.filter(
                (item) => item !== action.payload,
            );
        },
        addSides: (state, action: PayloadAction<string>) => {
            state.selectedSidesTypes.push(action.payload);
        },
        removeSides: (state, action: PayloadAction<string>) => {
            state.selectedSidesTypes = state.selectedMeatTypes.filter(
                (item) => item !== action.payload,
            );
        },
        clearFilters: (state) => {
            state.selectedCategories = [];
            state.selectedAuthors = [];
            state.selectedMeatTypes = [];
            state.selectedSidesTypes = [];
            state.selectedAllergens = [];
        },
    },
});

export const selectAllergensFilter = (state: ApplicationState) =>
    state.filtersSlice.selectedAllergens;
export const selectFilter = (state: ApplicationState) => state.filtersSlice;
export const filtersReducer = filtersSlice.reducer;
export const {
    addAllergen,
    removeAllergen,
    addCategory,
    removeCategory,
    addAuthor,
    removeAuthor,
    addMeat,
    removeMeat,
    addSides,
    removeSides,
    clearFilters,
} = filtersSlice.actions;
