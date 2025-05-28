import { RecipeSchema } from '~/constants/validation-schemas/recipe';
import { RecipeType } from '~/types/recipe';
import { MeasureUnitResponse } from '~/types/response';

import { Endpoints } from '../constants/paths';
import { apiSlice } from '../create-api';

export const createRecipeApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getMeasureUnits: build.query<MeasureUnitResponse[], void>({
            query: () => ({ url: Endpoints.MEASURE_UNITS }),
        }),
        createRecipe: build.mutation<RecipeType, RecipeSchema>({
            query: (body) => ({ url: Endpoints.RECIPE, method: 'POST', body }),
        }),
    }),
});

export const { useGetMeasureUnitsQuery, useCreateRecipeMutation } = createRecipeApi;
