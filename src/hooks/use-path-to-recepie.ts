import { useLocation } from 'react-router';

import { NAV_MENU_ITEMS } from '~/constants/nav-menu';
import { CardData } from '~/types/card-data';

type PathType = Pick<CardData, 'id' | 'category' | 'subcategory'>;

export const useRecepiePath = ({ id, category, subcategory }: PathType) => {
    const { pathname } = useLocation();

    const [currCategory, currSubcategory] = pathname.split('/').filter(Boolean);

    const firstSubcategory = NAV_MENU_ITEMS.find(
        ({ path }) => path === `/${category[0]}`,
    )?.subcategories.filter(({ path }) => subcategory.includes(path.slice(1)))[0].path;

    if (currCategory && currSubcategory) {
        return `${id}`;
    }
    return `${category[0]}${firstSubcategory}/${id}`;
};
