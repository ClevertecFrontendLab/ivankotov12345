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
    const currSearchValue = searchValue?.trim().toLowerCase().length
        ? searchValue?.trim().toLowerCase()
        : undefined;

    return {
        allergens: normalizeFilterCategory(selectedAllergens),
        subcategoriesIds: normalizeFilterCategory(selectedCategories),
        meat: normalizeFilterCategory(selectedMeatTypes),
        garnish: normalizeFilterCategory(selectedSidesTypes),
        searchString: currSearchValue,
        sortBy: 'createdAt',
        sortOrder: 'asc',
    };
};
