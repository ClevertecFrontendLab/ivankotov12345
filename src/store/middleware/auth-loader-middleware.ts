import { isFulfilled, isPending, isRejected, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import { setIsLoading } from '../slices/app-slice';

export const authLoaderMiddleware: Middleware =
    ({ dispatch }: MiddlewareAPI) =>
    (next) =>
    (action) => {
        if (isPending(action)) {
            dispatch(setIsLoading(true));
        }

        if (isFulfilled(action) || isRejected(action)) {
            dispatch(setIsLoading(false));
        }

        return next(action);
    };
