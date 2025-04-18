import { type RouteObject } from 'react-router';

import { Layout } from '~/components/layout';
import { ROUTER_PATHS } from '~/constants/router-paths';
import { CategoryPage } from '~/pages/category-page';
import { HomePage } from '~/pages/home-page';
import { JuiciestPage } from '~/pages/juiciest-page';
import { RecepiePage } from '~/pages/recepie-page';

export const rootPage: RouteObject = {
    path: ROUTER_PATHS.homePage,
    element: <Layout />,
    children: [
        {
            index: true,
            element: <HomePage />,
        },
        {
            path: ROUTER_PATHS.juiciestPage,
            element: <JuiciestPage />,
        },
        {
            path: ROUTER_PATHS.subcategory,
            children: [
                {
                    index: true,
                    element: <CategoryPage />,
                },
                {
                    path: ROUTER_PATHS.recepie,
                    element: <RecepiePage />,
                },
            ],
        },
    ],
};
