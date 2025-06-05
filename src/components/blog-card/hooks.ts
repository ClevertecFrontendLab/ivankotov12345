import { useLocation, useNavigate } from 'react-router';

export const useBloggerNavigation = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (id: string, anchor: string = '') => {
        navigate(`${pathname}/${id}${anchor}`);
    };
};
