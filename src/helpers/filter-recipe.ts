import { RecipeType } from '~/types/recipe';

export const filterRecipesByAllergens = (allergens: string[], recipes: RecipeType[]) => {
    if (!allergens.length) return [];
    const matchString = `(${allergens.join('|')})`;

    const regExp = new RegExp(matchString, 'i');

    const hasMatches = recipes.some((recipe) =>
        recipe.ingredients.some((ingredient) => regExp.test(ingredient.title)),
    );

    if (!hasMatches) return [];

    return recipes.filter(
        (recipe) => !recipe.ingredients.some((ingredient) => regExp.test(ingredient.title)),
    );
};

export const filterRecipesByCategories = (categories: string[], recipes: RecipeType[]) => {
    if (!categories.length) return recipes;
    return recipes.filter(({ category }) =>
        category.some((category) => categories.includes(category)),
    );
};

export const filterRecipesByMeatType = (meatType: string[], recipes: RecipeType[]) => {
    if (!meatType.length) return recipes;
    return recipes.filter(({ meat }) => meat && meatType.includes(meat));
};

export const filterRecipesBySidesType = (sideType: string[], recipes: RecipeType[]) => {
    if (!sideType.length) return recipes;
    return recipes.filter(({ side }) => side && sideType.includes(side));
};

export const filterRecipesByAuthorType = (authors: string[], recipes: RecipeType[]) => {
    if (!authors.length) return recipes;
    return recipes.filter(({ author }) => author && authors.includes(author));
};

export const filterRecipesBySearch = (searchValue: string, recipes: RecipeType[]) => {
    if (!searchValue.trim()) return recipes;
    const searchQuery = searchValue.toLowerCase();

    return recipes.filter(({ title }) => title.toLowerCase().includes(searchQuery));
};
