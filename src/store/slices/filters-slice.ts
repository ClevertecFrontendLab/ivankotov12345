import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from '../configure-store';

type FiltersStateType = {
    selectedAllergens: string[];
    selectedCategories: string[];
    selectedAuthors: string[];
    selectedMeatTypes: string[];
    selectedSidesTypes: string[];
    allFilters: string[];
    isFiltered: boolean;
};

const initialState: FiltersStateType = {
    selectedAllergens: [],
    selectedCategories: [],
    selectedAuthors: [],
    selectedMeatTypes: [],
    selectedSidesTypes: [],
    allFilters: [],
    isFiltered: false,
};

export const filtersSlice = createSlice({
    name: 'filtersSlice',
    initialState,
    reducers: {
        addAllergen: (state, action: PayloadAction<string>) => {
            const allergen = action.payload.trim().toLowerCase();

            if (!state.selectedAllergens.includes(allergen)) {
                state.selectedAllergens.push(allergen);
            }
        },
        removeAllergen: (state, action: PayloadAction<string>) => {
            state.selectedAllergens = state.selectedAllergens.filter(
                (allergen) => allergen !== action.payload,
            );
        },
        addCategory: (state, action: PayloadAction<string>) => {
            if (!state.selectedCategories.includes(action.payload)) {
                state.selectedCategories.push(action.payload);
            }
        },
        removeCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategories = state.selectedCategories.filter(
                (category) => category !== action.payload,
            );
        },
        addAuthor: (state, action: PayloadAction<string>) => {
            if (!state.selectedAuthors.includes(action.payload)) {
                state.selectedAuthors.push(action.payload);
            }
        },
        removeAuthor: (state, action: PayloadAction<string>) => {
            state.selectedAuthors = state.selectedAuthors.filter(
                (author) => author !== action.payload,
            );
        },
        addMeat: (state, action: PayloadAction<string>) => {
            if (!state.selectedMeatTypes.includes(action.payload)) {
                state.selectedMeatTypes.push(action.payload);
            }
        },
        removeMeat: (state, action: PayloadAction<string>) => {
            state.selectedMeatTypes = state.selectedMeatTypes.filter(
                (item) => item !== action.payload,
            );
        },
        addSides: (state, action: PayloadAction<string>) => {
            if (!state.selectedSidesTypes.includes(action.payload)) {
                state.selectedSidesTypes.push(action.payload);
            }
        },
        removeSides: (state, action: PayloadAction<string>) => {
            state.selectedSidesTypes = state.selectedMeatTypes.filter(
                (item) => item !== action.payload,
            );
        },
        setIsFiltered: (state) => {
            state.isFiltered = true;
        },
        removeIsFiltered: (state) => {
            state.isFiltered = false;
        },
        clearAllergensFilters: (state) => {
            state.selectedAllergens = [];
        },
        clearFilters: (state) => {
            state.selectedCategories = [];
            state.selectedAuthors = [];
            state.selectedMeatTypes = [];
            state.selectedSidesTypes = [];
            state.selectedAllergens = [];
            state.isFiltered = false;
        },
    },
});

export const selectAllergensFilter = (state: ApplicationState) =>
    state.filtersSlice.selectedAllergens;

export const selectFilter = createSelector(
    (state: ApplicationState) => state.filtersSlice,
    (filters) => {
        const { isFiltered, ...rest } = filters;
        return rest;
    },
);
export const selectIsFiltered = (state: ApplicationState) => state.filtersSlice.isFiltered;

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
    clearAllergensFilters,
    setIsFiltered,
    removeIsFiltered,
    clearFilters,
} = filtersSlice.actions;
