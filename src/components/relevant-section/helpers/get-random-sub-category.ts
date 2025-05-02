import { Subcategory } from '~/types/nav-menu';

export const getRandomSubCategory = (categories: Subcategory[]) => {
    if (!categories || categories.length === 0) return;

    const randomIndex = Math.floor(Math.random() * categories.length);

    return categories[randomIndex];
};
