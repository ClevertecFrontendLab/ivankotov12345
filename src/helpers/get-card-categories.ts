import { NavMenuItem, Subcategory } from '~/types/nav-menu';

export const getCardCategories = (
    categories: NavMenuItem[],
    subCategories: Subcategory[],
    subCategoriesIds: string[],
) => {
    const categoriesIdList = subCategories
        .filter(({ _id }) => subCategoriesIds.includes(_id))
        .map((category) => category.rootCategoryId);

    return categories.filter(({ _id }) => categoriesIdList.includes(_id));
};
