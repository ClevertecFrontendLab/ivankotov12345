import {
    CREATE_NOTE_STATUS,
    DELETE_NOTE_STATUS,
    RESPONSE_STATUS,
    UPDATE_INFO_STATUS,
    UPDATE_PASSWORD_STATUS,
} from '~/constants/statuses';
import { NoteSchema } from '~/constants/validation-schemas/note';
import { UpdatePasswordSchema } from '~/constants/validation-schemas/update-user-data';
import { setCurrentUser, setCurrentUserStatistic } from '~/store/slices/user-slice';
import { BloggerNotes } from '~/types/blogger';
import { ResponseData } from '~/types/response';
import { UpdateUserInfo, UserData, UserStatistics } from '~/types/user';

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
            providesTags: () => [USER_TAG],
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

        updateInfo: build.mutation<void, UpdateUserInfo>({
            query: (body) => ({ url: Endpoints.UPDATE_INFO, method: 'PATCH', body }),
            transformErrorResponse: (response) => ({
                ...response,
                ...UPDATE_INFO_STATUS[RESPONSE_STATUS.SERVER_ERROR],
            }),
            invalidatesTags: [USER_TAG],
        }),

        updatePassword: build.mutation<void, Omit<UpdatePasswordSchema, 'confirmNewPassword'>>({
            query: (body) => ({ url: Endpoints.UPDATE_PASSWORD, method: 'PATCH', body }),
            transformErrorResponse: (response) => {
                const currentResponse = response.data as ResponseData;
                if (response.status === RESPONSE_STATUS.SERVER_ERROR) {
                    return { ...response, ...UPDATE_PASSWORD_STATUS[RESPONSE_STATUS.SERVER_ERROR] };
                } else {
                    return { ...response, title: 'Ошибка', description: currentResponse.message };
                }
            },
        }),
    }),
});

export const {
    useGetCurrentUserQuery,
    useGetUserStatisticQuery,
    useCreateNoteMutation,
    useDeleteNoteMutation,
    useUpdateInfoMutation,
    useUpdatePasswordMutation,
} = userApi;
