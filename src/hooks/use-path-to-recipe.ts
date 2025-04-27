import { NAV_MENU_ITEMS } from '~/constants/nav-menu';
import { CardData } from '~/types/card-data';

import { usePathItems } from './use-path-items';

type PathType = Pick<CardData, 'id' | 'category' | 'subcategory'>;

export const useRecipePath = ({ id, category, subcategory }: PathType) => {
    const { secondItemPath, thirdItemPath } = usePathItems();

    const firstSubcategory = NAV_MENU_ITEMS.find(
        ({ path }) => path === category[0],
    )?.subcategories.filter(({ path }) => subcategory.includes(path))[0].path;

    if (secondItemPath && thirdItemPath) {
        return `${id}`;
    }
    return `/${category[0]}/${firstSubcategory}/${id}`;
};
