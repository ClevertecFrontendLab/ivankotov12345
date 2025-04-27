import { createSlice } from '@reduxjs/toolkit';

import { ApplicationState } from '../configure-store';

type BurgerStateType = {
    isOpen: boolean;
};

const initialState: BurgerStateType = {
    isOpen: false,
};

export const burgerSlice = createSlice({
    name: 'burgerSlice',
    initialState,
    reducers: {
        toggleBurgerMenu: (state) => {
            state.isOpen = !state.isOpen;
        },
        closeBurgerMenu: (state) => {
            state.isOpen = false;
        },
    },
});

export const selectBurger = (state: ApplicationState) => state.burgerSlice;
export const burgerReducer = burgerSlice.reducer;
export const { toggleBurgerMenu, closeBurgerMenu } = burgerSlice.actions;
