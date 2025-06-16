import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserData } from '~/types/user';

import { ApplicationState } from '../configure-store';

type UserSateType = {
    currentUser?: UserData;
};

const initialState: UserSateType = {
    currentUser: undefined,
};

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<UserData | undefined>) => {
            state.currentUser = action.payload;
        },
    },
});

export const selectCurrentUser = (state: ApplicationState) => state.userSlice.currentUser;

export const userReducer = userSlice.reducer;

export const { setCurrentUser } = userSlice.actions;
