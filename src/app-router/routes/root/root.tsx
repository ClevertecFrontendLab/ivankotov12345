import { Outlet, type RouteObject } from 'react-router';

import { ROUTER_PATHS } from '~/constants/router-paths';

export const homePage: RouteObject = {
    path: ROUTER_PATHS.homePage,
    element: (
        <div>
            <Outlet />
        </div>
    ),
    children: [
        {
            index: true,
            element: <div>homePage</div>,
        },
        {
            path: ROUTER_PATHS.juiciestPage,
            element: <div>juiciestPage</div>,
        },
        {
            path: ROUTER_PATHS.veganPage,
            element: <div>veganPage</div>,
        },
    ],
};
