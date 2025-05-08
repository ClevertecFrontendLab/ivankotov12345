export type SortBy = 'likes' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export type QueryParams = Partial<{
    sortBy: SortBy;
    sortOrder: SortOrder;
    limit: number;
    allergens: string;
    searchString: string;
    meat: string;
    garnish: string;
    subcategoriesIds: string;
}>;

export type RecipeParams = QueryParams & {
    id?: string;
};

export type RecipeInfiniteParams = RecipeParams & {
    endpoint: string;
};
