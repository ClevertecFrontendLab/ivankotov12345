import { BloggerResponse } from '~/types/blogger';
import { BloggersParams } from '~/types/request-params';

import { Endpoints } from '../constants/paths';
import { apiSlice } from '../create-api';

export const blogsApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getBloggers: build.query<BloggerResponse, BloggersParams>({
            query: ({ currentUserId, limit }) => ({
                url: Endpoints.BLOGGERS,
                params: { currentUserId, limit },
            }),
        }),
    }),
});

export const { useGetBloggersQuery } = blogsApi;
