import { QueryParams } from '~/types/request-params';

const normalizeFilterCategory = (filters: string[]) =>
    filters.length > 0
        ? filters.map((filter) => filter.trim().toLowerCase()).toString()
        : undefined;

export const getQueryParams = (
    params: Record<string, string[]>,
    searchValue: string,
): QueryParams => {
    const { selectedAllergens, selectedCategories, selectedMeatTypes, selectedSidesTypes } = params;

    return {
        allergens: normalizeFilterCategory(selectedAllergens),
        subcategoriesIds: normalizeFilterCategory(selectedCategories),
        meat: normalizeFilterCategory(selectedMeatTypes),
        garnish: normalizeFilterCategory(selectedSidesTypes),
        searchString: searchValue?.trim().toLowerCase(),
        sortBy: 'createdAt',
        sortOrder: 'asc',
    };
};
