import { CREATE_NOTE_STATUS, DELETE_NOTE_STATUS, RESPONSE_STATUS } from '~/constants/statuses';
import { NoteSchema } from '~/constants/validation-schemas/note';
import { setCurrentUser, setCurrentUserStatistic } from '~/store/slices/user-slice';
import { BloggerNotes } from '~/types/blogger';
import { UserData, UserStatistics } from '~/types/user';

import { Endpoints } from '../constants/paths';
import { USER_TAG } from '../constants/tags';
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
            providesTags: [USER_TAG],
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

        createNote: build.mutation<BloggerNotes, NoteSchema>({
            query: (body) => ({ url: Endpoints.NOTE, method: 'POST', body }),
            transformErrorResponse: (response) => ({
                ...response,
                ...CREATE_NOTE_STATUS[RESPONSE_STATUS.SERVER_ERROR],
            }),
            invalidatesTags: [USER_TAG],
        }),

        deleteNote: build.mutation<void, string>({
            query: (id) => ({ url: `${Endpoints.NOTE}/${id}`, method: 'DELETE' }),
            transformErrorResponse: (response) => ({
                ...response,
                ...DELETE_NOTE_STATUS[RESPONSE_STATUS.SERVER_ERROR],
            }),
            invalidatesTags: [USER_TAG],
        }),
    }),
});

export const {
    useGetCurrentUserQuery,
    useGetUserStatisticQuery,
    useCreateNoteMutation,
    useDeleteNoteMutation,
} = userApi;
