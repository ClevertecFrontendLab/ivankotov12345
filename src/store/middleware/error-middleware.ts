import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import { ALERT_ERROR_TEXT } from '~/constants/statuses';

import { setToastData, setToastIsOpen } from '../slices/app-slice';

export const appErrorMiddleware: Middleware =
    ({ dispatch }: MiddlewareAPI) =>
    (next) =>
    (action) => {
        if (isRejectedWithValue(action)) {
            dispatch(setToastData(ALERT_ERROR_TEXT));
            dispatch(setToastIsOpen(true));
        }
        return next(action);
    };
