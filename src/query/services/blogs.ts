import { BloggerInfoResponse, BloggerResponse, SubscriptionRequest } from '~/types/blogger';
import { BloggerByIdParams, BloggersParams } from '~/types/request-params';

import { Endpoints } from '../constants/paths';
import { BLOGGERS_TAG } from '../constants/tags';
import { apiSlice } from '../create-api';

export const blogsApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getBloggers: build.query<BloggerResponse, BloggersParams>({
            query: ({ currentUserId, limit }) => ({
                url: Endpoints.BLOGGERS,
                params: { currentUserId, limit },
            }),
            providesTags: [BLOGGERS_TAG],
        }),
        toggleSubscription: build.mutation<void, SubscriptionRequest>({
            query: (body) => ({ url: Endpoints.TOGGLE_SUBSCRIPTION, method: 'PATCH', body }),
            invalidatesTags: () => [BLOGGERS_TAG],
        }),
        getBloggerById: build.query<BloggerInfoResponse, BloggerByIdParams>({
            query: (params) => {
                const { bloggerId, currentUserId } = params;
                return {
                    url: `${Endpoints.BLOGGERS}/${bloggerId}`,
                    method: 'GET',
                    params: { currentUserId: currentUserId },
                };
            },
        }),
    }),
});

export const { useGetBloggersQuery, useToggleSubscriptionMutation, useGetBloggerByIdQuery } =
    blogsApi;
