import { Params, redirect } from 'react-router';

import { ROUTER_PATHS } from '~/constants/router-paths';
import { getLocalStorageItem } from '~/helpers/storage';
import { ACCESS_TOKEN_STORAGE_KEY } from '~/query/constants/storage-keys';
import { store } from '~/store/configure-store';

export const checkRouteExists = async ({ params }: { params: Params<string> }) => {
    const { subcategory } = params;
    const token = getLocalStorageItem(ACCESS_TOKEN_STORAGE_KEY);

    if (!subcategory) return null;

    if (!token) return null;

    const subcategories = store.getState().categorySlice.subCategories;

    if (subcategories.length === 0) return null;

    const subcategoriesList = subcategories.map(({ category }) => category);

    if (!subcategoriesList.includes(subcategory)) {
        return redirect(ROUTER_PATHS.notFound);
    }

    return null;
};
