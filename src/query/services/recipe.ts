import { ALERT_ERROR_TEXT, LIKE_RECIPE_ERROR } from '~/constants/statuses';
import { setIsSearching } from '~/store/slices/search-input-slice';
import {
    clearSelectedRecipeTitle,
    setSelectedRecipeTitle,
} from '~/store/slices/selected-recipe-slice';
import { MetaParams, RecipeListResponse, RecipeType } from '~/types/recipe';
import { RecipeInfiniteParams, RecipeParams } from '~/types/request-params';

import { Endpoints } from '../constants/paths';
import { ACTIVITIES_TAG, RECIPE_TAG } from '../constants/tags';
import { apiSlice } from '../create-api';

export const recipeApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getRecipes: build.infiniteQuery<
            RecipeListResponse,
            RecipeInfiniteParams,
            Partial<MetaParams>
        >({
            infiniteQueryOptions: {
                initialPageParam: { page: 1 },
                getNextPageParam: (_1, _2, lastPageParam) => {
                    const current = lastPageParam.page || 1;
                    return { page: current + 1 };
                },
            },
            query: ({ queryArg, pageParam }) => {
                const { endpoint, ...queryParams } = queryArg;
                return {
                    url: endpoint,
                    params: { ...queryParams, page: pageParam.page },
                };
            },
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } finally {
                    dispatch(setIsSearching(false));
                }
            },
            transformErrorResponse: (response) => ({ ...response, ...ALERT_ERROR_TEXT }),
            providesTags: () => [{ type: RECIPE_TAG, id: 'LIST' }],
        }),

        getRecipesByCategory: build.query<RecipeListResponse, RecipeParams>({
            query: (params) => {
                const { id, ...queryParams } = params;
                return { url: `${Endpoints.RECIPES_BY_CATEGORY}/${id}`, params: queryParams };
            },
            transformErrorResponse: (response) => ({ ...response, ...ALERT_ERROR_TEXT }),
            providesTags: [RECIPE_TAG],
        }),

        getRecipe: build.query<RecipeType, string>({
            query: (id) => ({ url: `${Endpoints.RECIPE}/${id}` }),
            transformResponse: (response: RecipeType) => {
                const { nutritionValue, ...rest } = response;

                const transformedNutritionValue = {
                    calories: nutritionValue.calories,
                    fats: nutritionValue.fats,
                    carbohydrates: nutritionValue.carbohydrates,
                    proteins: nutritionValue.proteins ?? nutritionValue.protein,
                };

                return {
                    ...rest,
                    nutritionValue: transformedNutritionValue,
                };
            },
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setSelectedRecipeTitle(data.title));
                } catch {
                    dispatch(clearSelectedRecipeTitle());
                }
            },
            providesTags: [RECIPE_TAG],
        }),

        likeRecipe: build.mutation<string, string>({
            query: (id) => ({ url: `${Endpoints.RECIPE}/${id}/${Endpoints.LIKE}`, method: 'POST' }),
            invalidatesTags: (_result, _error, id) => [
                { type: RECIPE_TAG, id },
                { type: RECIPE_TAG, id: 'LIST' },
            ],
            transformErrorResponse: (response) => ({ ...response, ...LIKE_RECIPE_ERROR }),
        }),

        bookmarkRecipe: build.mutation<string, string>({
            query: (id) => ({
                url: `${Endpoints.RECIPE}/${id}/${Endpoints.BOOKMARK}`,
                method: 'POST',
            }),
            invalidatesTags: (_result, _error, id) => [
                { type: RECIPE_TAG, id },
                { type: RECIPE_TAG, id: 'LIST' },
                { type: ACTIVITIES_TAG, id: 'LIST' },
            ],
            transformErrorResponse: (response) => ({ ...response, ...LIKE_RECIPE_ERROR }),
        }),
    }),
});

export const {
    useGetRecipesInfiniteQuery,
    useLazyGetRecipesByCategoryQuery,
    useGetRecipeQuery,
    useLikeRecipeMutation,
    useBookmarkRecipeMutation,
} = recipeApi;
