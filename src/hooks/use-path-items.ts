import { useLocation } from 'react-router';

export const usePathItems = () => {
    const { pathname } = useLocation();
    const [secondItemPath, thirdItemPath, currId] = pathname.split('/').filter(Boolean);

    return {
        secondItemPath,
        thirdItemPath,
        currId,
    };
};
