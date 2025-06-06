import { type RouteObject } from 'react-router';

import { RecipeErrorBoundary } from '~/app-router/error-boundaries/recipe-error';
import { HydrateFallback } from '~/app-router/fallback/hydrate-fallback';
import { recipeLoader } from '~/app-router/loaders/recipe-loader';
import { checkRouteExists } from '~/app-router/utils/check-route-exists';
import { ROUTER_PATHS } from '~/constants/router-paths';
import { BloggerProfilePage } from '~/pages/blogger-profile-page';
import { BlogsPage } from '~/pages/blogs-page';
import { CategoryPage } from '~/pages/category-page';
import { CreateRecipePage } from '~/pages/create-recipe-page';
import { HomePage } from '~/pages/home-page';
import { JuiciestPage } from '~/pages/juiciest-page';
import { RecipePage } from '~/pages/recipe-page';

import { notFoundPage } from '../not-found';

export const rootPage: RouteObject = {
    path: ROUTER_PATHS.homePage,
    lazy: async () => {
        const { Layout } = await import('~/components/layout');
        return { Component: Layout };
    },
    HydrateFallback: HydrateFallback,
    children: [
        {
            index: true,
            element: <HomePage />,
            HydrateFallback: HydrateFallback,
        },
        {
            path: ROUTER_PATHS.juiciestPage,
            element: <JuiciestPage />,
        },
        {
            path: ROUTER_PATHS.newRecipe,
            element: <CreateRecipePage />,
        },
        {
            path: ROUTER_PATHS.editRecipe,
            element: <CreateRecipePage />,
        },
        {
            path: ROUTER_PATHS.blogs,
            element: <BlogsPage />,
        },
        {
            path: ROUTER_PATHS.blogggerProfile,
            element: <BloggerProfilePage />,
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
