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
            invalidatesTags: (_, _error) => [{ type: RECIPE_TAG, id: 'LIST' }],
        }),

        updateRecipe: build.mutation<RecipeType, { id: string; body: RecipeSchema }>({
            query: ({ id, body }) => ({ url: `${Endpoints.RECIPE}/${id}`, method: 'PATCH', body }),
            invalidatesTags: (_result, _error, { id }) => [{ type: RECIPE_TAG, id: id }],
        }),

        deleteRecipe: build.mutation<void, string>({
            query: (id) => ({ url: `${Endpoints.RECIPE}/${id}`, method: 'DELETE' }),
        }),
    }),
});

export const {
    useGetMeasureUnitsQuery,
    useCreateRecipeMutation,
    useUpdateRecipeMutation,
    useDeleteRecipeMutation,
} = createRecipeApi;
