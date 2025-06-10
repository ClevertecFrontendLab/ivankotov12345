import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import { RESPONSE_STATUS } from '~/constants/statuses';
import {
    getLocalStorageItem,
    removeLocalStorageItem,
    setLocalStorageItem,
} from '~/helpers/storage';

import { ACCESS_TOKEN, BASE_URL, Endpoints } from './constants/paths';
import { ACCESS_TOKEN_STORAGE_KEY } from './constants/storage-keys';
import { BLOGGERS_TAG, RECIPE_TAG } from './constants/tags';

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
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === RESPONSE_STATUS.FORBIDDEN) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refreshResult = await baseQuery(Endpoints.REFRESH_TOKEN, api, extraOptions);

                if (refreshResult.error) {
                    removeLocalStorageItem(ACCESS_TOKEN_STORAGE_KEY);
                    return result;
                }

                const token = refreshResult.meta?.response?.headers.get(ACCESS_TOKEN);
                if (token) {
                    setLocalStorageItem(ACCESS_TOKEN_STORAGE_KEY, token);
                } else {
                    removeLocalStorageItem(ACCESS_TOKEN_STORAGE_KEY);
                    return result;
                }
            } catch {
                removeLocalStorageItem(ACCESS_TOKEN_STORAGE_KEY);
                return result;
            } finally {
                release();
            }

            result = await baseQuery(args, api, extraOptions);
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQueryWithRefresh,
    tagTypes: [RECIPE_TAG, BLOGGERS_TAG],
    endpoints: () => ({}),
});
