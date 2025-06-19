import { LOAD_IMAGE_STATUS, RESPONSE_STATUS, USER_ERROR } from '~/constants/statuses';
import { ImageLoadResponse } from '~/types/response';

import { Endpoints } from '../constants/paths';
import { USER_TAG } from '../constants/tags';
import { apiSlice } from '../create-api';

export const loadImageApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        loadImage: build.mutation<ImageLoadResponse, FormData>({
            query: (body) => ({
                url: Endpoints.LOAD_IMAGE,
                method: 'POST',
                body,
                formData: true,
            }),
            transformErrorResponse: (response) => ({
                ...response,
                ...LOAD_IMAGE_STATUS[RESPONSE_STATUS.SERVER_ERROR],
            }),
        }),

        loadAvatar: build.mutation({
            query: (body) => ({
                url: Endpoints.LOAD_AVATAR,
                method: 'POST',
                body,
                formData: true,
            }),
            transformErrorResponse: (response) => ({
                ...response,
                ...USER_ERROR,
            }),
            invalidatesTags: [USER_TAG],
        }),
    }),
});

export const { useLoadImageMutation, useLoadAvatarMutation } = loadImageApi;
