import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import { ALERT_ERROR_TEXT } from '~/constants/errors';

import { setErrorAlertIsOpen, setErrorData } from '../slices/app-slice';

export const appErrorMiddleware: Middleware =
    ({ dispatch }: MiddlewareAPI) =>
    (next) =>
    (action) => {
        if (isRejectedWithValue(action)) {
            dispatch(setErrorData(ALERT_ERROR_TEXT));
            dispatch(setErrorAlertIsOpen(true));
        }
        return next(action);
    };
