import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export type ResponseData = {
    message: string;
    statusText?: string;
    error?: string;
    statusCode: number;
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
