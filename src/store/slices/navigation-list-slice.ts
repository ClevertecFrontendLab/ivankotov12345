import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NavListItemType } from '../../types/nav-list-type'
import { RootState } from '..';

import { NavListState } from './types';

const initialState: NavListState = {
    navList: null,
    error: null,
    isLoading: false,
}

export const navListSelect = (state: RootState) => state.navList

export const navigationListSlice = createSlice({
    name: 'navList',
    initialState,
    reducers: {
        getNavListFetch: state => {
            state.isLoading = true
            state.navList = null
            state.error = null
        },
        getNavListDataSuccess: (state, action: PayloadAction<NavListItemType[]>) => {
            state.navList = action.payload
            state.isLoading = false
        },
        getNavListDataFail: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

export const navigationReducer = navigationListSlice.reducer
export const { getNavListDataSuccess, getNavListFetch, getNavListDataFail } = navigationListSlice.actions

