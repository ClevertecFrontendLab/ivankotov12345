import { data, Params, redirect } from 'react-router';

import { ROUTER_PATHS } from '~/constants/router-paths';
import { getLocalStorageItem } from '~/helpers/storage-categories';
import { SUBCATEGORY_STORAGE_KEY } from '~/query/constants/storage-keys';
import { Subcategory } from '~/types/nav-menu';

export const checkRouteExists = async ({ params }: { params: Params<string> }) => {
    try {
        const { subcategory } = params;

        if (!subcategory) return null;

        const subcategories = (await getLocalStorageItem(SUBCATEGORY_STORAGE_KEY)) as Subcategory[];
        const subcategoriesList = subcategories.map(({ category }) => category);
        if (subcategory && !subcategoriesList.includes(subcategory)) {
            throw data('No such directory', { status: 404 });
        }
    } catch {
        return redirect(ROUTER_PATHS.notFound);
    }
};
