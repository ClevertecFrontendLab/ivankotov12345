import { Navigate, useLocation } from 'react-router';

import { ROUTER_PATHS } from '~/constants/router-paths';
import { useAppDispatch } from '~/store/hooks';
import { setToastIsOpen } from '~/store/slices/app-slice';
import { clearSelectedRecipeTitle } from '~/store/slices/selected-recipe-slice';

export const RecipeErrorBoundary = () => {
    const { state } = useLocation();

    const dispatch = useAppDispatch();

    dispatch(clearSelectedRecipeTitle());
    dispatch(setToastIsOpen(true));

    return <Navigate to={state?.from ?? ROUTER_PATHS.homePage} />;
};
