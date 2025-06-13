import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BloggerInfo } from '~/types/blogger';

import { ApplicationState } from '../configure-store';

type BlogsStateType = {
    selectedBlogger: BloggerInfo | null;
};

const initialState: BlogsStateType = {
    selectedBlogger: null,
};

export const blogsSlice = createSlice({
    name: 'blogsSlice',
    initialState,
    reducers: {
        setSelectedBlogger: (state, action: PayloadAction<BloggerInfo | null>) => {
            state.selectedBlogger = action.payload;
        },
    },
});

export const selectSelectedBlogger = (state: ApplicationState) => state.blogsSlice.selectedBlogger;
export const blogsReducer = blogsSlice.reducer;
export const { setSelectedBlogger } = blogsSlice.actions;
