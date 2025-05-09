import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { ALERT_ERROR_TEXT } from '~/constants/errors';
import { useAppDispatch } from '~/store/hooks';
import { setErrorAlertIsOpen, setErrorData } from '~/store/slices/app-slice';

export const RecipeErrorBoundary = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setErrorAlertIsOpen(true));
        dispatch(setErrorData(ALERT_ERROR_TEXT));
        navigate(-1);
    }, [navigate, dispatch]);

    return null;
};
