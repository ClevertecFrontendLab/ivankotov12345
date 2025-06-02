import { removeLocalStorageItem, setLocalStorageItem } from '~/helpers/storage';
import { ResponseData } from '~/types/response';

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
                    const accessToken = meta?.response?.headers.get(ACCESS_TOKEN);

                    if (accessToken) {
                        setLocalStorageItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
                    }
                } catch {
                    removeLocalStorageItem(ACCESS_TOKEN_STORAGE_KEY);
                }
            },
        }),
        checkAuth: build.query<ResponseData, void>({
            query: () => ({ url: Endpoints.CHECK_AUTH, method: 'GET', credentials: 'include' }),
        }),
        refreshToken: build.mutation<ResponseData, void>({
            query: () => ({ url: Endpoints.REFRESH_TOKEN, method: 'GET', credentials: 'include' }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    const { meta } = await queryFulfilled;
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
        sendOtp: build.mutation({
            query: (body) => ({ url: Endpoints.FORGOT_PASSWORD, method: 'POST', body }),
        }),
        verifyOtp: build.mutation({
            query: (body) => ({ url: Endpoints.VERIFY_OTP, method: 'POST', body }),
        }),
        resetAuthData: build.mutation({
            query: (body) => ({ url: Endpoints.RESET_AUTH_DATA, method: 'POST', body }),
        }),
    }),
});

export const {
    useSignInMutation,
    useSignUpMutation,
    useSendOtpMutation,
    useVerifyOtpMutation,
    useResetAuthDataMutation,
    useCheckAuthQuery,
    useRefreshTokenMutation,
} = authApi;
