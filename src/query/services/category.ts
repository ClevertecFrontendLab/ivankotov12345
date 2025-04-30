import { setCategories } from '~/store/slices/category-slice';
import { NavMenuItem, Subcategory } from '~/types/nav-menu';

import { Endpoints, IMAGES_BASE_URL } from '../constants/paths';
import { apiSlice } from '../create-api';
import { getCategories } from '../utils/get-categories';

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query<(NavMenuItem | Subcategory)[], void>({
            query: () => ({ url: Endpoints.CATEGORY }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const categoriesData = getCategories(data);

                    dispatch(setCategories(categoriesData));
                } catch (error) {
                    console.log(error);
                }
            },
            transformResponse: (response: NavMenuItem[]): NavMenuItem[] =>
                response.map((navMenuItem) => ({
                    ...navMenuItem,
                    icon: navMenuItem.icon && `${IMAGES_BASE_URL}${navMenuItem.icon}`,
                })),
        }),
    }),
});

export const { useGetCategoriesQuery } = categoryApi;
