import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { BookType } from '../../types/book-detailed-types'
import { RootState } from '..'

import { BookStateType } from './types'

export const BookSelect = (state: RootState) => state.book

export const initialState: BookStateType = {
    book: null,
    error: null,
    isLoading: false,
    id: null,

}

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        getBookFetch: (state, action: PayloadAction<string>) => {
            state.id = action.payload
            state.book = null
            state.error = null
            state.isLoading = true
        },
        getBookDataSuccess: (state, action: PayloadAction<BookType>) => {
            state.book = action.payload
            state.isLoading = false 
        },
        getBookDataFail: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false 
        }
    }
})

export const { getBookFetch, getBookDataSuccess, getBookDataFail } = bookSlice.actions
export const bookReducer = bookSlice.reducer;