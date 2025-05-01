export type SortBy = 'likes' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export type QueryParamsType = {
    sortBy?: SortBy;
    sortOrder?: SortOrder;
};
