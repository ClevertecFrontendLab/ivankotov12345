import { Navigate } from 'react-router';
import { type RouteObject } from 'react-router';

import { ROUTER_PATHS } from '~/constants/router-paths';

export const anyRoute: RouteObject = {
    path: ROUTER_PATHS.anyRoute,
    element: <Navigate to={ROUTER_PATHS.notFound} replace />,
};
