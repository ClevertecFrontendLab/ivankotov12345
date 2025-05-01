import { QueryParamsType } from '~/types/query-params';

export const JUICIEST_QUERY_PARAMS: QueryParamsType = {
    sortBy: 'likes',
    sortOrder: 'desc',
};

export const CAROUSEL_QUERY_PARAMS: QueryParamsType = {
    sortBy: 'createdAt',
    limit: 10,
};
