import { CloseIcon } from '@chakra-ui/icons';
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Heading,
    HStack,
    IconButton,
    Spacer,
    VStack,
} from '@chakra-ui/react';
import React, { useCallback, useMemo } from 'react';

import { CARD_DATA } from '~/constants/card-data';
import {
    AUTHORS_LIST,
    DRAWER_MEAT_ITEMS,
    DRAWER_SIDES_ITEMS,
} from '~/constants/drawer-filter-items';
import { NAV_MENU_ITEMS } from '~/constants/nav-menu';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { DATA_TEST_ID } from '~/constants/test-id';
import { filterRecipes } from '~/helpers/filter-recipe';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { closeDrawer, selectFilterDrawer } from '~/store/slices/filter-drawer-slice';
import {
    addAuthor,
    addCategory,
    addMeat,
    addSides,
    clearFilters,
    removeAuthor,
    removeCategory,
    removeMeat,
    removeSides,
    selectFilter,
} from '~/store/slices/filters-slice';
import { setFilteredRecipes } from '~/store/slices/flter-recipe-slice';
import { FilterItem } from '~/types/filter-item';

import { AllergensSelectMenu } from '../allergens-select-menu';
import { DrawerMenu } from './drawer-menu';
import { FilterCheckboxGroup } from './filter-checkbox-group';
import { FilterDrawerTag } from './filter-drawer-tag';

const categoryItems = NAV_MENU_ITEMS.map((item) => ({
    label: item.category,
    item: item.path,
}));

export const FilterDrawer: React.FC = () => {
    const { isOpen } = useAppSelector(selectFilterDrawer);
    const { ...filters } = useAppSelector(selectFilter);
    const dispatch = useAppDispatch();

    const onClose = () => {
        dispatch(closeDrawer());
    };

    const onClearFiltersClick = () => dispatch(clearFilters());

    const onFindRecipeClick = () => {
        const rec = filterRecipes(CARD_DATA, filters);

        dispatch(setFilteredRecipes(rec));
        dispatch(closeDrawer());
    };

    const getFilteredItems = useCallback(
        (items: FilterItem[], selectedItems: string[]) =>
            items.filter(({ item }) => selectedItems.includes(item)).map(({ label }) => label),
        [],
    );

    const categoryFilterItems = getFilteredItems(categoryItems, filters.selectedCategories);
    const meatFilterItems = getFilteredItems(DRAWER_MEAT_ITEMS, filters.selectedMeatTypes);
    const sidesFilterItems = getFilteredItems(DRAWER_SIDES_ITEMS, filters.selectedSidesTypes);
    const authorsFilterItems = getFilteredItems(AUTHORS_LIST, filters.selectedAuthors);

    const allFilterItems = useMemo(
        () =>
            [
                ...categoryFilterItems,
                ...meatFilterItems,
                ...sidesFilterItems,
                ...authorsFilterItems,
            ].concat(filters.selectedAllergens),
        [
            categoryFilterItems,
            meatFilterItems,
            sidesFilterItems,
            authorsFilterItems,
            filters.selectedAllergens,
        ],
    );

    const isDisabled = allFilterItems.length === 0;
    return (
        <Drawer isOpen={isOpen} onClose={onClose} placement='right'>
            <DrawerOverlay bg='shadowed' backdropFilter='blur(2px)' />
            <DrawerContent
                data-test-id={DATA_TEST_ID.filterDrawer}
                maxW={{ base: 'drawerWidth.sm', lg: 'drawerWidth.lg' }}
                w='full'
            >
                <DrawerHeader as={Flex} alignItems='center' px={4} py={8}>
                    <Heading fontSize='2xl' fontWeight='bold'>
                        Фильтр
                    </Heading>

                    <Spacer />

                    <IconButton
                        variant='black'
                        icon={<CloseIcon />}
                        aria-label='close'
                        borderRadius='full'
                        size='xs'
                        onClick={onClose}
                        data-test-id={DATA_TEST_ID.closeFilterDrawer}
                    />
                </DrawerHeader>

                <DrawerBody as={VStack} alignItems='start' py={0} px={4} gap={6}>
                    <DrawerMenu
                        placeholder={PLACEHOLDERS.searchByCategories}
                        items={categoryItems}
                        addItem={addCategory}
                        removeItem={removeCategory}
                        testId={DATA_TEST_ID.filterMenuButtonCategory}
                        tagList={categoryFilterItems}
                    />

                    <DrawerMenu
                        placeholder={PLACEHOLDERS.searchByAuthor}
                        items={AUTHORS_LIST}
                        addItem={addAuthor}
                        removeItem={removeAuthor}
                        tagList={authorsFilterItems}
                    />

                    <FilterCheckboxGroup
                        description='Тип мяса:'
                        itemsList={DRAWER_MEAT_ITEMS}
                        addItem={addMeat}
                        removeItem={removeMeat}
                    />

                    <FilterCheckboxGroup
                        description='Тип гарнира:'
                        itemsList={DRAWER_SIDES_ITEMS}
                        addItem={addSides}
                        removeItem={removeSides}
                    />

                    <AllergensSelectMenu isDrawerType={true} />

                    {allFilterItems.length && (
                        <HStack flexWrap='wrap'>
                            {allFilterItems.map((tag) => (
                                <FilterDrawerTag key={tag} label={tag} />
                            ))}
                        </HStack>
                    )}
                </DrawerBody>

                <DrawerFooter justifyContent='center' p={8} gap={2}>
                    <Button
                        variant='outline'
                        onClick={onClearFiltersClick}
                        data-test-id={DATA_TEST_ID.clearFilterButton}
                    >
                        Очистить фильтр
                    </Button>
                    <Button
                        variant='black'
                        onClick={onFindRecipeClick}
                        isDisabled={isDisabled}
                        data-test-id={DATA_TEST_ID.findRecipeButton}
                        pointerEvents={isDisabled ? 'none' : 'auto'}
                    >
                        Найти рецепт
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
