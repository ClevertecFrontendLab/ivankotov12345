import { setCurrentUser } from '~/store/slices/user-slice';
import { UserData } from '~/types/user';

import { Endpoints } from '../constants/paths';
import { apiSlice } from '../create-api';

export const userApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getCurrentUser: build.query<UserData, void>({
            query: () => ({ url: Endpoints.CURRENT_USER }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCurrentUser(data));
                } catch {
                    dispatch(setCurrentUser());
                }
            },
        }),
    }),
});

export const { useGetCurrentUserQuery } = userApi;
