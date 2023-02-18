
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { BookCardType } from '../../types/book-types'
import { RootState } from '..'

import { BooksStateType } from './types'


export const BooksSelect = (state: RootState) => state.books

const initialState: BooksStateType = {
    books: null,
    error: null,
    isLoading: false,
}

export const booksSlice = createSlice({
    name: 'booksList',
    initialState,
    reducers: {
        getBooksListFetch: state => {
            state.books = null
            state.error = null
            state.isLoading = true
        },

        getBooksDataSuccess: (state, action: PayloadAction<BookCardType[]>) => {
            state.books = action.payload
            state.isLoading = false
        },

        getbooksDataFail: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false
        },
    }
})

export const { getBooksDataSuccess, getBooksListFetch, getbooksDataFail } = booksSlice.actions;
export const booksReducer = booksSlice.reducer;