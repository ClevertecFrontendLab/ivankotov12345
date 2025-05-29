import { redirect } from 'react-router';

import { ROUTER_PATHS } from '~/constants/router-paths';
import { authApi } from '~/query/services/auth';
import { store } from '~/store/configure-store';

export const authLoader = async ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const isSignInPage = pathname === ROUTER_PATHS.signIn;

    try {
        await store.dispatch(authApi.endpoints.checkAuth.initiate()).unwrap();

        if (isSignInPage) {
            return redirect(ROUTER_PATHS.homePage);
        }

        return null;
    } catch {
        if (!isSignInPage) {
            return redirect(ROUTER_PATHS.signIn);
        }
        return null;
    }
};
