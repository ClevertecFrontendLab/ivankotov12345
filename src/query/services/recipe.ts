import { setIsLoading } from '~/store/slices/app-slice';
import {
    clearSelectedRecipeTitle,
    setSelectedRecipeTitle,
} from '~/store/slices/selected-recipe-slice';
import { MetaParams, RecipeListResponse, RecipeType } from '~/types/recipe';
import { RecipeInfiniteParams, RecipeParams } from '~/types/request-params';

import { Endpoints } from '../constants/paths';
import { apiSlice } from '../create-api';

export const recpeApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getRecipes: build.infiniteQuery<
            RecipeListResponse,
            RecipeInfiniteParams,
            Partial<MetaParams>
        >({
            infiniteQueryOptions: {
                initialPageParam: { page: 1 },
                getNextPageParam: (lastPageParam) => ({ page: lastPageParam.meta.page + 1 }),
            },
            query: ({ queryArg, pageParam }) => {
                const { endpoint, ...queryParams } = queryArg;
                return {
                    url: endpoint,
                    params: { ...queryParams, page: pageParam.page },
                };
            },
        }),
        getRecipesByCategory: build.query<RecipeListResponse, RecipeParams>({
            query: (params) => {
                const { id, ...queryParams } = params;
                return { url: `${Endpoints.RECIPES_BY_CATEGORY}/${id}`, params: queryParams };
            },
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setIsLoading(true));
                    await queryFulfilled;
                } finally {
                    dispatch(setIsLoading(false));
                }
            },
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
                    dispatch(setIsLoading(true));
                    const { data } = await queryFulfilled;
                    dispatch(setSelectedRecipeTitle(data.title));
                } catch {
                    dispatch(clearSelectedRecipeTitle());
                } finally {
                    dispatch(setIsLoading(false));
                }
            },
        }),
    }),
});

export const { useGetRecipesInfiniteQuery, useLazyGetRecipesByCategoryQuery, useGetRecipeQuery } =
    recpeApi;
