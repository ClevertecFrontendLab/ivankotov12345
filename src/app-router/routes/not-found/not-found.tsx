import { type RouteObject } from 'react-router';

import { ROUTER_PATHS } from '~/constants/router-paths';
import { NotFound } from '~/pages/not-found';

export const notFoundPage: RouteObject = {
    path: ROUTER_PATHS.notFound,
    element: <NotFound />,
};
