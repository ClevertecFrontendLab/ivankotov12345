import { type RouteObject } from 'react-router';

import { Layout } from '~/components/layout';
import { ROUTER_PATHS } from '~/constants/router-paths';
import { HomePage } from '~/pages/home-page';
import { JuiciestPage } from '~/pages/juiciest-page';
import { VeganPage } from '~/pages/vegan-page';

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
            path: `${ROUTER_PATHS.veganPage}/*`,
            element: <VeganPage />,
        },
    ],
};
