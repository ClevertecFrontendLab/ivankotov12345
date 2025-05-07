import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { ALERT_ERROR_TEXT } from '~/constants/errors';
import { useAppDispatch } from '~/store/hooks';
import { setErrorAlertIsOpen, setErrorData } from '~/store/slices/app-slice';

export const RecipeErrorBoundary = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        navigate(-1);
        dispatch(setErrorAlertIsOpen(true));
        dispatch(setErrorData(ALERT_ERROR_TEXT));
    }, [navigate, dispatch]);

    return null;
};
