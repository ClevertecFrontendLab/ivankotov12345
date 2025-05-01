import { QueryParamsType } from '~/types/query-params';
import { MetaParams, RecipeListResponse } from '~/types/recipe';

import { Endpoints } from '../constants/paths';
import { apiSlice } from '../create-api';

export const recpeApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getRecipes: build.infiniteQuery<RecipeListResponse, QueryParamsType, Partial<MetaParams>>({
            infiniteQueryOptions: {
                initialPageParam: { page: 1 },
                getNextPageParam: (lastPageParam) => ({ page: lastPageParam.meta.page + 1 }),
            },
            query: ({ queryArg, pageParam }) => ({
                url: Endpoints.RECIPE,
                params: { ...queryArg, page: pageParam.page },
            }),
        }),
    }),
});

export const { useGetRecipesInfiniteQuery } = recpeApi;
