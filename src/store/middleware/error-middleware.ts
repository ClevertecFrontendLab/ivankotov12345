import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import { ALERT_ERROR_SEARCH_TEXT, ALERT_ERROR_TEXT } from '~/constants/errors';

import { store } from '../configure-store';
import { setErrorAlertIsOpen, setErrorData } from '../slices/app-slice';

export const appErrorMiddleware: Middleware =
    ({ dispatch }: MiddlewareAPI) =>
    (next) =>
    (action) => {
        if (isRejectedWithValue(action)) {
            const isFiltered = store.getState().filtersSlice.isFiltered;
            if (isFiltered) {
                dispatch(setErrorData(ALERT_ERROR_SEARCH_TEXT));
                dispatch(setErrorAlertIsOpen(true));
            }
            dispatch(setErrorData(ALERT_ERROR_TEXT));
            dispatch(setErrorAlertIsOpen(true));
        }
        return next(action);
    };
