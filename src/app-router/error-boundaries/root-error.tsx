import { useEffect } from 'react';

import { ALERT_ERROR_TEXT } from '~/constants/statuses';
import { useAppDispatch } from '~/store/hooks';
import { setToastData, setToastIsOpen } from '~/store/slices/app-slice';

export const RootError = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setToastIsOpen(true));
        dispatch(setToastData(ALERT_ERROR_TEXT));
    }, [dispatch]);

    return null;
};
