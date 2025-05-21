import { RouteObject } from 'react-router';

import { HydrateFallback } from '~/app-router/fallback/hydrate-fallback';
import { ROUTER_PATHS } from '~/constants/router-paths';
import { RestoreAuthDataPage } from '~/pages/restore-auth-data-page';
import { SignInPage } from '~/pages/sign-in-page';
import { SignUpPage } from '~/pages/sign-up-page';
import { VerificationPage } from '~/pages/verification-page';

export const authPage: RouteObject = {
    lazy: async () => {
        const { AuthLayout } = await import('~/components/auth-layout');
        return { Component: AuthLayout };
    },
    HydrateFallback: HydrateFallback,
    children: [
        {
            path: ROUTER_PATHS.signIn,
            element: <SignInPage />,
            children: [
                {
                    path: ROUTER_PATHS.restoreAuthData,
                    element: <RestoreAuthDataPage />,
                },
            ],
        },
        {
            path: ROUTER_PATHS.signUp,
            element: <SignUpPage />,
        },
        {
            path: ROUTER_PATHS.verification,
            element: <VerificationPage />,
        },
    ],
};
