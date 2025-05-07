import { type RouteObject } from 'react-router';

import { RecipeErrorBoundary } from '~/app-router/error-boundaries/recipe-error';
import { HydrateFallback } from '~/app-router/fallback/hydrate-fallback';
import { recipeLoader } from '~/app-router/loaders/recipe-loader';
import { checkRouteExists } from '~/app-router/utils/check-route-exists';
import { Layout } from '~/components/layout';
import { ROUTER_PATHS } from '~/constants/router-paths';
import { CategoryPage } from '~/pages/category-page';
import { HomePage } from '~/pages/home-page';
import { JuiciestPage } from '~/pages/juiciest-page';
import { RecipePage } from '~/pages/recipe-page';

import { notFoundPage } from '../not-found';

export const rootPage: RouteObject = {
    path: ROUTER_PATHS.homePage,
    element: <Layout />,
    HydrateFallback: HydrateFallback,
    children: [
        {
            index: true,
            element: <HomePage />,
        },
        {
            path: ROUTER_PATHS.juiciestPage,
            element: <JuiciestPage />,
            //loader: juiciestLoader,
        },
        {
            path: ROUTER_PATHS.subcategory,
            loader: checkRouteExists,
            children: [
                {
                    index: true,
                    element: <CategoryPage />,
                },
                {
                    path: ROUTER_PATHS.recipe,
                    element: <RecipePage />,
                    loader: recipeLoader,
                    ErrorBoundary: RecipeErrorBoundary,
                },
            ],
        },
        notFoundPage,
    ],
};
