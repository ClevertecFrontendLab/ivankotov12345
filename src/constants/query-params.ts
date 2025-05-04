import { QueryParams } from '~/types/request-params';

export const JUICIEST_QUERY_PARAMS: QueryParams = {
    sortBy: 'likes',
    sortOrder: 'desc',
};

export const CAROUSEL_QUERY_PARAMS: QueryParams = {
    sortBy: 'createdAt',
    sortOrder: 'desc',
    limit: 10,
};

export const JUICIEST_SECTION_QUERY_PARAMS: QueryParams = {
    ...JUICIEST_QUERY_PARAMS,
    limit: 4,
};
