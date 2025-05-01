import { NavMenuItem, Subcategory } from '~/types/nav-menu';

export const getCategories = (categories: (NavMenuItem | Subcategory)[]): NavMenuItem[] =>
    categories.filter((item): item is NavMenuItem => !('rootCategoryId' in item));

export const getSubCategories = (categories: (NavMenuItem | Subcategory)[]): Subcategory[] =>
    categories.filter((item): item is Subcategory => 'rootCategoryId' in item);
