import { LOAD_IMAGE_STATUS, RESPONSE_STATUS } from '~/constants/statuses';
import { ImageLoadResponse } from '~/types/response';

import { Endpoints } from '../constants/paths';
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
    }),
});

export const { useLoadImageMutation } = loadImageApi;
