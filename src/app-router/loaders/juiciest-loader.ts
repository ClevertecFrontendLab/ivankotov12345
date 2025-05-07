import { JUICIEST_QUERY_PARAMS } from '~/constants/query-params';
import { Endpoints } from '~/query/constants/paths';
import { recpeApi } from '~/query/services/recipe';
import { store } from '~/store/configure-store';

export const juiciestLoader = async () => ({
    recipes: await store.dispatch(
        recpeApi.endpoints.getRecipes.initiate({
            endpoint: Endpoints.RECIPE,
            ...JUICIEST_QUERY_PARAMS,
        }),
    ),
});
