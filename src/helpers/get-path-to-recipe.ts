import { NavMenuItem, Subcategory } from '~/types/nav-menu';

export const getPathToRecipe = (
    categories: NavMenuItem[],
    categoriesIds: string[],
    subCategories: Subcategory[],
) => {
    const subCategoryItem = subCategories.find(({ _id }) => _id === categoriesIds[0]);
    const categoryItem = categories.find(
        ({ _id }) => _id === subCategoryItem?.rootCategoryId,
    )?.category;

    return `${categoryItem}/${subCategoryItem?.category}`;
};
