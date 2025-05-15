import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { ALERT_ERROR_TEXT } from '~/constants/statuses';
import { useAppDispatch } from '~/store/hooks';
import { setToastData, setToastIsOpen } from '~/store/slices/app-slice';

export const RecipeErrorBoundary = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setToastIsOpen(true));
        dispatch(setToastData(ALERT_ERROR_TEXT));
        navigate(-1);
    }, [navigate, dispatch]);

    return null;
};
