import { Params } from 'react-router';

import { recipeApi } from '~/query/services/recipe';
import { store } from '~/store/configure-store';

export const recipeLoader = async ({ params }: { params: Params<string> }) => {
    const { id } = params;
    if (id) {
        return {
            recipe: await store.dispatch(recipeApi.endpoints.getRecipe.initiate(id)),
        };
    }
};
