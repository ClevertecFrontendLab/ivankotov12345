import { CardData } from '~/types/card-data';
import { NavMenuItem, Subcategory } from '~/types/nav-menu';

import { usePathItems } from './use-path-items';

type PathType = Pick<CardData, '_id' | 'categoriesIds'> & {
    subCategories: Subcategory[];
    categories: NavMenuItem[];
};

export const useRecipePath = ({ _id, categoriesIds, subCategories, categories }: PathType) => {
    const { secondItemPath, thirdItemPath, currId } = usePathItems();
    const firstSubcategoryItem = subCategories.filter(({ _id }) => categoriesIds.includes(_id))[0];

    const firstSubCategoryRootId = firstSubcategoryItem?.rootCategoryId;

    const firstSubcategory = firstSubcategoryItem?.category;

    const firstCategory = categories.find(({ _id }) => _id === firstSubCategoryRootId)?.category;

    if (secondItemPath && thirdItemPath && !currId) {
        return `${_id}`;
    }
    return `/${firstCategory}/${firstSubcategory}/${_id}`;
};
