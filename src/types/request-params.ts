export type SortBy = 'likes' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export type QueryParams = {
    sortBy?: SortBy;
    sortOrder?: SortOrder;
    limit?: number;
};

export type RecipeParams = QueryParams & {
    id?: string;
};

export type RecipeInfiniteParams = RecipeParams & {
    endpoint: string;
};
