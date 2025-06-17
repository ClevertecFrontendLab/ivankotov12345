import { setCurrentUser, setCurrentUserStatistic } from '~/store/slices/user-slice';
import { UserData, UserStatistics } from '~/types/user';

import { Endpoints } from '../constants/paths';
import { apiSlice } from '../create-api';

export const userApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getCurrentUser: build.query<UserData, void>({
            query: () => ({ url: Endpoints.CURRENT_USER, method: 'GET' }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCurrentUser(data));
                } catch {
                    dispatch(setCurrentUser());
                }
            },
        }),

        getUserStatistic: build.query<UserStatistics, void>({
            query: () => ({ url: Endpoints.USER_STATISTICS, method: 'GET' }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCurrentUserStatistic(data));
                } catch {
                    dispatch(setCurrentUserStatistic());
                }
            },
        }),
    }),
});

export const { useGetCurrentUserQuery, useGetUserStatisticQuery } = userApi;
