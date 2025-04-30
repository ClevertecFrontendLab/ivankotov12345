import { NavMenuItem, Subcategory } from '~/types/nav-menu';

export const getCategories = (categories: (NavMenuItem | Subcategory)[]): NavMenuItem[] =>
    categories.filter((item): item is NavMenuItem => !('rootCategoryId' in item));
