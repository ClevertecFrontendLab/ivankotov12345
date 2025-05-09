import { setLocalStorageItem } from '~/helpers/storage-categories';
import { setIsLoading } from '~/store/slices/app-slice';
import { setCategories, setSubCategories } from '~/store/slices/category-slice';
import { NavMenuItem, Subcategory } from '~/types/nav-menu';

import { Endpoints } from '../constants/paths';
import { CATEGORY_STORAGE_KEY, SUBCATEGORY_STORAGE_KEY } from '../constants/storage-keys';
import { apiSlice } from '../create-api';
import { getCategories, getSubCategories } from '../utils/get-categories';

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query<(NavMenuItem | Subcategory)[], void>({
            query: () => ({ url: Endpoints.CATEGORY }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setIsLoading(true));

                    const { data } = await queryFulfilled;
                    const categoriesData = getCategories(data);
                    const subCategoriesData = getSubCategories(data);

                    dispatch(setCategories(categoriesData));
                    dispatch(setSubCategories(subCategoriesData));

                    setLocalStorageItem(CATEGORY_STORAGE_KEY, categoriesData);
                    setLocalStorageItem(SUBCATEGORY_STORAGE_KEY, subCategoriesData);
                } catch (error) {
                    console.log(error);
                } finally {
                    dispatch(setIsLoading(false));
                }
            },
        }),
    }),
});

export const { useGetCategoriesQuery } = categoryApi;
