import { removeLocalStorageItem, setLocalStorageItem } from '~/helpers/storage';

import { ACCESS_TOKEN, Endpoints } from '../constants/paths';
import { ACCESS_TOKEN_STORAGE_KEY } from '../constants/storage-keys';
import { apiSlice } from '../create-api';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        signIn: build.mutation({
            query: (body) => ({
                url: Endpoints.SIGN_IN,
                method: 'POST',
                body,
                credentials: 'include',
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { meta } = await queryFulfilled;
                    console.log(meta);
                    const accessToken = meta?.response?.headers.get(ACCESS_TOKEN);

                    if (accessToken) {
                        setLocalStorageItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
                    }
                } catch {
                    removeLocalStorageItem(ACCESS_TOKEN_STORAGE_KEY);
                }
            },
        }),
        signUp: build.mutation({
            query: (body) => ({ url: Endpoints.SIGN_UP, method: 'POST', body }),
        }),
    }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
