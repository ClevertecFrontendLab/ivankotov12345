import { useEffect, useMemo } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { ROUTER_PATHS } from '~/constants/router-paths';
import { getLocalStorageItem } from '~/helpers/storage';
import { ACCESS_TOKEN_STORAGE_KEY } from '~/query/constants/storage-keys';
import { useRefreshTokenMutation } from '~/query/services/auth';

export const AuthGuard: React.FC = () => {
    const navigate = useNavigate();

    const token = useMemo(() => getLocalStorageItem(ACCESS_TOKEN_STORAGE_KEY), []);

    const [refreshToken, { error }] = useRefreshTokenMutation();

    useEffect(() => {
        if (token) {
            refreshToken();
        }
    }, [token, refreshToken]);

    useEffect(() => {
        if (error || !token) {
            navigate(ROUTER_PATHS.signIn);
        }
    }, [error, token, navigate]);

    return <Outlet />;
};
