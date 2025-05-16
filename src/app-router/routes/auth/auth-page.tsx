import { RouteObject } from 'react-router';

import { AuthLayout } from '~/components/auth-layout';
import { ROUTER_PATHS } from '~/constants/router-paths';
import { RestoreAuthDataPage } from '~/pages/restore-auth-data-page';
import { SignInPage } from '~/pages/sign-in-page';
import { SignUpPage } from '~/pages/sign-up-page';
import { VerificationPage } from '~/pages/verification-page';

export const authPage: RouteObject = {
    element: <AuthLayout />,
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
