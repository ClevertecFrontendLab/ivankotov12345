import { useNavigate } from 'react-router';

import { ROUTER_PATHS } from '~/constants/router-paths';

export const useBloggerNavigation = () => {
    const navigate = useNavigate();

    return (id: string, anchor: string = '') => {
        navigate(`${ROUTER_PATHS.blogs}/${id}${anchor}`);
    };
};
