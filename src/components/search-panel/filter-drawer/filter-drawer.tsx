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
import React, { useCallback, useEffect, useMemo } from 'react';

import {
    AUTHORS_LIST,
    DRAWER_MEAT_ITEMS,
    DRAWER_SIDES_ITEMS,
} from '~/constants/drawer-filter-items';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { DATA_TEST_ID } from '~/constants/test-id';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectCategory } from '~/store/slices/category-slice';
import { closeDrawer, selectFilterDrawer } from '~/store/slices/filter-drawer-slice';
import {
    addAuthor,
    addCategory,
    addMeat,
    addSides,
    clearFilters,
    removeAuthor,
    removeCategory,
    removeIsFiltered,
    removeMeat,
    removeSides,
    selectFilter,
    setIsFiltered,
} from '~/store/slices/filters-slice';
import { FilterItem } from '~/types/filter-item';

import { AllergensSelectMenu } from '../allergens-select-menu';
import { DrawerMenu } from './drawer-menu';
import { FilterCheckboxGroup } from './filter-checkbox-group';
import { FilterDrawerTag } from './filter-drawer-tag';

export const FilterDrawer: React.FC = () => {
    const { isOpen } = useAppSelector(selectFilterDrawer);
    const { categories } = useAppSelector(selectCategory);
    const { ...filters } = useAppSelector(selectFilter);

    const dispatch = useAppDispatch();

    const categoryItems = categories.map(({ title, subCategories }) => ({
        item: subCategories.map((sub) => sub._id).toString(),
        label: title,
    }));

    const onClose = () => {
        dispatch(closeDrawer());
    };

    const onClearFiltersClick = () => dispatch(clearFilters());

    const onFindRecipeClick = () => {
        dispatch(setIsFiltered());
        dispatch(closeDrawer());
    };

    const getFilteredItems = useCallback(
        (items: FilterItem[], selectedItems: string[]) =>
            items.filter(({ item }) => selectedItems.includes(item)),
        [],
    );

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

    useEffect(() => {
        if (isOpen) {
            dispatch(removeIsFiltered());
        }
    }, [isOpen, dispatch]);

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
                        selectedItems={filters.selectedCategories}
                        addItem={addCategory}
                        removeItem={removeCategory}
                        testId={DATA_TEST_ID.filterMenuButtonCategory}
                        tagList={categoryFilterItems}
                    />

                    <DrawerMenu
                        placeholder={PLACEHOLDERS.searchByAuthor}
                        items={AUTHORS_LIST}
                        selectedItems={filters.selectedAuthors}
                        addItem={addAuthor}
                        removeItem={removeAuthor}
                        tagList={authorsFilterItems}
                    />

                    <FilterCheckboxGroup
                        description='Тип мяса:'
                        itemsList={DRAWER_MEAT_ITEMS}
                        addItem={addMeat}
                        removeItem={removeMeat}
                        selectedItems={filters.selectedMeatTypes}
                    />

                    <FilterCheckboxGroup
                        description='Тип гарнира:'
                        itemsList={DRAWER_SIDES_ITEMS}
                        addItem={addSides}
                        removeItem={removeSides}
                        selectedItems={filters.selectedSidesTypes}
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
