import { Endpoints } from '../constants/paths';
import { apiSlice } from '../create-api';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        signUp: build.mutation({
            query: (body) => ({ url: Endpoints.SIGN_UP, method: 'POST', body }),
        }),
    }),
});

export const { useSignUpMutation } = authApi;
