import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getLocalStorageItem } from '~/helpers/storage';

import { BASE_URL } from './constants/paths';
import { ACCESS_TOKEN_STORAGE_KEY } from './constants/storage-keys';

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
    endpoints: () => ({}),
});
