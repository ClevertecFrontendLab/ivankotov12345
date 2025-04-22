import { RecipeType } from '~/types/recipe';

export const filterRecipesByAllergens = (allergens: string[], recipes: RecipeType[]) => {
    if (!allergens.length) return [];
    const matchString = `(${allergens.join('|')})`;

    const regExp = new RegExp(matchString, 'i');

    return recipes.filter(
        (recipe) => !recipe.ingredients.some((ingredient) => regExp.test(ingredient.title)),
    );
};
