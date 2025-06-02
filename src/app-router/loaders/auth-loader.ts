import { redirect } from 'react-router';

import { ROUTER_PATHS } from '~/constants/router-paths';
import { getLocalStorageItem } from '~/helpers/storage';
import { ACCESS_TOKEN_STORAGE_KEY } from '~/query/constants/storage-keys';

export const authLoader = async () => {
    const token = (await getLocalStorageItem(ACCESS_TOKEN_STORAGE_KEY)) as string;

    if (!token) {
        return redirect(ROUTER_PATHS.signIn);
    }

    return;
};
