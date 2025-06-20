import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export type ResponseData = {
    message: string;
    statusCode: number;
    statusText?: string;
    error?: string;
    description?: string;
};

export type ResponseError = Omit<FetchBaseQueryError, 'data'> & { data: ResponseData };

export type ImageLoadResponse = {
    name: string;
    url: string;
    _id: string;
};

export type MeasureUnitResponse = {
    _id: string;
    name: string;
};
