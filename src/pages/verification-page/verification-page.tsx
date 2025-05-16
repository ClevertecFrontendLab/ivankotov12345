import { useEffect } from 'react';
import { Navigate } from 'react-router';
import { useSearchParams } from 'react-router';

import { ROUTER_PATHS } from '~/constants/router-paths';
import { VERIFIES_SUCCESS } from '~/constants/statuses';
import { useAppToast } from '~/hooks/use-app-toast';
import { useAppDispatch } from '~/store/hooks';
import { setIsModalVerificationOpen } from '~/store/slices/app-slice';

export const VerificationPage: React.FC = () => {
    const [searchParams] = useSearchParams();

    const dispatch = useAppDispatch();

    const isEmailVerified = JSON.parse(searchParams.get('emailVerified') as string);

    const showToast = useAppToast();

    useEffect(() => {
        if (isEmailVerified) {
            showToast(VERIFIES_SUCCESS);
        } else {
            dispatch(setIsModalVerificationOpen(true));
        }
    }, [isEmailVerified, dispatch, showToast]);

    return isEmailVerified ? (
        <Navigate to={ROUTER_PATHS.signIn} />
    ) : (
        <Navigate to={ROUTER_PATHS.signUp} />
    );
};
