import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import { RESPONSE_STATUS } from '~/constants/statuses';
import { getLocalStorageItem, setLocalStorageItem } from '~/helpers/storage';

import { ACCESS_TOKEN, BASE_URL, Endpoints } from './constants/paths';
import { ACCESS_TOKEN_STORAGE_KEY } from './constants/storage-keys';
import { ACTIVITIES_TAG, BLOGGERS_TAG, RECIPE_TAG, USER_TAG } from './constants/tags';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
        const token = getLocalStorageItem(ACCESS_TOKEN_STORAGE_KEY);
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

const fetchBaseQueryWithRefresh: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    object,
    { response?: Response }
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();

    const result = await baseQuery(args, api, extraOptions);

    if (
        !(result.error && result.error.status === RESPONSE_STATUS.FORBIDDEN) ||
        api.endpoint === 'refreshToken'
    ) {
        return result;
    }

    if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
            const refreshResult = await baseQuery(
                {
                    url: Endpoints.REFRESH_TOKEN,
                    method: 'GET',
                    credentials: 'include',
                },
                api,
                extraOptions,
            );

            const token = refreshResult.meta?.response?.headers.get(ACCESS_TOKEN);

            if (token) {
                setLocalStorageItem(ACCESS_TOKEN_STORAGE_KEY, token);
            }
        } finally {
            release();
        }
    }

    await mutex.waitForUnlock();
    return baseQuery(args, api, extraOptions);
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQueryWithRefresh,
    tagTypes: [RECIPE_TAG, BLOGGERS_TAG, USER_TAG, ACTIVITIES_TAG],
    endpoints: () => ({}),
});
