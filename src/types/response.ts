import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export type ResponseData = {
    message: string;
    error: string;
    statusCode: number;
};

export type ResponseError = Omit<FetchBaseQueryError, 'data'> & { data: ResponseData };
