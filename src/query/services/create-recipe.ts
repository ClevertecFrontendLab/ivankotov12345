import {
    CREATE_DRAFT_STATUS,
    CREATE_RECIPE_STATUS,
    DELETE_RECIPE_STATUS,
    RESPONSE_STATUS,
} from '~/constants/statuses';
import { RecipeSchema } from '~/constants/validation-schemas/recipe';
import { RecipeType } from '~/types/recipe';
import { MeasureUnitResponse } from '~/types/response';

import { Endpoints } from '../constants/paths';
import { RECIPE_TAG } from '../constants/tags';
import { apiSlice } from '../create-api';

export const createRecipeApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getMeasureUnits: build.query<MeasureUnitResponse[], void>({
            query: () => ({ url: Endpoints.MEASURE_UNITS }),
        }),

        createRecipe: build.mutation<RecipeType, RecipeSchema>({
            query: (body) => ({ url: Endpoints.RECIPE, method: 'POST', body }),
            invalidatesTags: () => [{ type: RECIPE_TAG, id: 'LIST' }],
            transformErrorResponse: (response) => {
                if (response.status === RESPONSE_STATUS.CONFLICT) {
                    return { ...response, ...CREATE_RECIPE_STATUS[RESPONSE_STATUS.CONFLICT] };
                } else {
                    return { ...response, ...CREATE_RECIPE_STATUS[RESPONSE_STATUS.SERVER_ERROR] };
                }
            },
        }),

        updateRecipe: build.mutation<RecipeType, { id: string; body: RecipeSchema }>({
            query: ({ id, body }) => ({ url: `${Endpoints.RECIPE}/${id}`, method: 'PATCH', body }),
            invalidatesTags: () => [RECIPE_TAG],
            transformErrorResponse: (response) => {
                if (response.status === RESPONSE_STATUS.CONFLICT) {
                    return { ...response, ...CREATE_RECIPE_STATUS[RESPONSE_STATUS.CONFLICT] };
                } else {
                    return { ...response, ...CREATE_RECIPE_STATUS[RESPONSE_STATUS.SERVER_ERROR] };
                }
            },
        }),

        deleteRecipe: build.mutation<void, string>({
            query: (id) => ({ url: `${Endpoints.RECIPE}/${id}`, method: 'DELETE' }),
            invalidatesTags: () => [RECIPE_TAG],
            transformErrorResponse: (response) => ({
                ...response,
                ...DELETE_RECIPE_STATUS[RESPONSE_STATUS.SERVER_ERROR],
            }),
        }),

        createDraft: build.mutation<RecipeType, Partial<RecipeSchema>>({
            query: (body) => ({ url: Endpoints.CREATE_DRAFT, method: 'POST', body }),
            transformErrorResponse: (response) => {
                if (response.status === RESPONSE_STATUS.CONFLICT) {
                    return { ...response, ...CREATE_DRAFT_STATUS[RESPONSE_STATUS.CONFLICT] };
                } else {
                    return { ...response, ...CREATE_DRAFT_STATUS[RESPONSE_STATUS.SERVER_ERROR] };
                }
            },
        }),
    }),
});

export const {
    useGetMeasureUnitsQuery,
    useCreateRecipeMutation,
    useUpdateRecipeMutation,
    useDeleteRecipeMutation,
    useCreateDraftMutation,
} = createRecipeApi;
