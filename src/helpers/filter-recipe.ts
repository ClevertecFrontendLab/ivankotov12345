import { RecipeType } from '~/types/recipe';

type FilterItemsType = Record<string, string[]>;

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

const normalizeItems = (items: string[]) => items.map((item) => item.trim().toLowerCase());

const normalizeFilters = (filters: FilterItemsType) => ({
    categories: normalizeItems(filters.selectedCategories),
    authors: normalizeItems(filters.selectedAuthors),
    meats: normalizeItems(filters.selectedMeatTypes),
    sides: normalizeItems(filters.selectedSidesTypes),
    allergens: new Set(normalizeItems(filters.selectedAllergens)),
});

const normalizeRecipeData = (recipe: RecipeType) => ({
    categories: normalizeItems(recipe.category),
    author: recipe.author?.trim().toLowerCase(),
    meat: recipe.meat?.trim().toLowerCase() ?? '',
    side: recipe.side?.trim().toLowerCase() ?? '',
    allergens: new Set(recipe.ingredients.map((ing) => ing.title.trim().toLowerCase())),
});

const CategoryFilter = (recipeCategories: string[], filterCategories: string[]) =>
    filterCategories.length === 0 ||
    recipeCategories.some((category) => filterCategories.includes(category));

const AuthorFilter = (recipeAuthor: string | undefined, filterAuthors: string[]) =>
    filterAuthors.length === 0 ||
    (recipeAuthor !== undefined && filterAuthors.includes(recipeAuthor));

const MeatFilter = (recipeMeat: string, filterMeats: string[]) =>
    filterMeats.length === 0 || filterMeats.includes(recipeMeat);

const SideFilter = (recipeSide: string, filterSides: string[]) =>
    filterSides.length === 0 || filterSides.includes(recipeSide);

const AllergenFilter = (recipeAllergens: Set<string>, filterAllergens: Set<string>) =>
    filterAllergens.size === 0 ||
    !Array.from(filterAllergens).some((allergen) => recipeAllergens.has(allergen));

export const filterRecipes = (recipes: RecipeType[], filters: FilterItemsType) => {
    const normalizedFilters = normalizeFilters(filters);

    return recipes.filter((recipe) => {
        const normalizedRecipe = normalizeRecipeData(recipe);

        return (
            CategoryFilter(normalizedRecipe.categories, normalizedFilters.categories) &&
            AuthorFilter(normalizedRecipe.author, normalizedFilters.authors) &&
            MeatFilter(normalizedRecipe.meat, normalizedFilters.meats) &&
            SideFilter(normalizedRecipe.side, normalizedFilters.sides) &&
            AllergenFilter(normalizedRecipe.allergens, normalizedFilters.allergens)
        );
    });
};

export const filterRecipesBySearch = (searchValue: string, recipes: RecipeType[]) => {
    if (!searchValue.trim()) return recipes;
    const searchQuery = searchValue.toLowerCase();

    return recipes.filter(({ title }) => title.toLowerCase().includes(searchQuery));
};
