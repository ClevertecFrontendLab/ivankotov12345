import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserData, UserStatistics } from '~/types/user';

import { ApplicationState } from '../configure-store';

type UserSateType = {
    currentUser?: UserData;
    currentUserStatistics?: UserStatistics;
};

const initialState: UserSateType = {
    currentUser: undefined,
    currentUserStatistics: undefined,
};

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<UserData | undefined>) => {
            state.currentUser = action.payload;
        },
        setCurrentUserStatistic: (state, action: PayloadAction<UserStatistics | undefined>) => {
            state.currentUserStatistics = action.payload;
        },
    },
});

export const selectCurrentUser = (state: ApplicationState) => state.userSlice.currentUser;
export const selectCurrentUserStatistic = (state: ApplicationState) =>
    state.userSlice.currentUserStatistics;

export const userReducer = userSlice.reducer;

export const { setCurrentUser, setCurrentUserStatistic } = userSlice.actions;
