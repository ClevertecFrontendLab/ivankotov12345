import { useEffect } from 'react';

import { ALERT_ERROR_TEXT } from '~/constants/errors';
import { useAppDispatch } from '~/store/hooks';
import { setErrorAlertIsOpen, setErrorData } from '~/store/slices/app-slice';

export const RootError = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setErrorAlertIsOpen(true));
        dispatch(setErrorData(ALERT_ERROR_TEXT));
    }, [dispatch]);

    return null;
};
