import { CloseIcon } from '@chakra-ui/icons';
import { HStack, Tag, TagLabel, TagRightIcon } from '@chakra-ui/react';
import { useMemo } from 'react';

import { COLORS_LIME } from '~/constants/colors';
import {
    AUTHORS_LIST,
    DRAWER_MEAT_ITEMS,
    DRAWER_SIDES_ITEMS,
} from '~/constants/drawer-filter-items';
import { DATA_TEST_ID } from '~/constants/test-id';
import { useAppSelector } from '~/store/hooks';
import { selectCategories } from '~/store/slices/category-slice';
import { selectFilter } from '~/store/slices/filters-slice';

import { getFilteredItems } from '../helpers/get-filter-items';

export const FilterTagList: React.FC<Partial<{ isDrawerType: boolean }>> = ({ isDrawerType }) => {
    const { ...filters } = useAppSelector(selectFilter);
    const categories = useAppSelector(selectCategories);

    const categoryItems = categories.map(({ title, subCategories }) => ({
        item: subCategories.map((sub) => sub._id).toString(),
        label: title,
    }));

    const categoryFilterItems = getFilteredItems(categoryItems, filters.selectedCategories);
    const meatFilterItems = getFilteredItems(DRAWER_MEAT_ITEMS, filters.selectedMeatTypes);
    const sidesFilterItems = getFilteredItems(DRAWER_SIDES_ITEMS, filters.selectedSidesTypes);
    const authorsFilterItems = getFilteredItems(AUTHORS_LIST, filters.selectedAuthors);

    const allFilterItems = useMemo(
        () =>
            [...categoryFilterItems, ...meatFilterItems, ...sidesFilterItems, ...authorsFilterItems]
                .map(({ label }) => label)
                .concat(filters.selectedAllergens),
        [
            categoryFilterItems,
            meatFilterItems,
            sidesFilterItems,
            authorsFilterItems,
            filters.selectedAllergens,
        ],
    );

    return (
        <HStack flexWrap='wrap' justifyContent={isDrawerType ? 'start' : 'center'}>
            {allFilterItems.map((item) => (
                <Tag
                    border='lime'
                    background={COLORS_LIME[100]}
                    color={COLORS_LIME[600]}
                    data-test-id={DATA_TEST_ID.filterTag}
                    key={item}
                >
                    <TagLabel>{item}</TagLabel>
                    <TagRightIcon as={CloseIcon} boxSize={2.5} color={COLORS_LIME[700]} />
                </Tag>
            ))}
        </HStack>
    );
};
