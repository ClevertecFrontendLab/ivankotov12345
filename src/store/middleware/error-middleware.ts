import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import { ToastStatus } from '~/types/toast-status';

import { setToastData, setToastIsOpen } from '../slices/app-slice';

export const appErrorMiddleware: Middleware =
    ({ dispatch }: MiddlewareAPI) =>
    (next) =>
    (action) => {
        if (isRejectedWithValue(action)) {
            if (action.payload) {
                const { status, title, description } = action.payload as ToastStatus;
                dispatch(setToastIsOpen(true));
                dispatch(setToastData({ status, title, description }));
            }
        }
        return next(action);
    };
