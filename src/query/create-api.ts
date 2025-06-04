import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getLocalStorageItem } from '~/helpers/storage';

import { BASE_URL } from './constants/paths';
import { ACCESS_TOKEN_STORAGE_KEY } from './constants/storage-keys';
import { BLOGGERS_TAG, RECIPE_TAG } from './constants/tags';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = getLocalStorageItem(ACCESS_TOKEN_STORAGE_KEY);
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: [RECIPE_TAG, BLOGGERS_TAG],
    endpoints: () => ({}),
});
