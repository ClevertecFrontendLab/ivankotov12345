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
    IconButton,
    Spacer,
    VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';

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

import { AllergensSelectMenu } from '../allergens-select-menu';
import { FilterTagList } from '../filter-tag-list';
import { checkFiltersEmpty } from '../helpers/check-empty';
import { getFilteredItems } from '../helpers/get-filter-items';
import { DrawerMenu } from './drawer-menu';
import { FilterCheckboxGroup } from './filter-checkbox-group';

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

    const categoryFilterItems = getFilteredItems(categoryItems, filters.selectedCategories);
    const authorsFilterItems = getFilteredItems(AUTHORS_LIST, filters.selectedAuthors);

    useEffect(() => {
        if (isOpen) {
            dispatch(removeIsFiltered());
        }
    }, [isOpen, dispatch]);

    const isDisabled = checkFiltersEmpty(filters);
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
                        description={PLACEHOLDERS.meatType}
                        itemsList={DRAWER_MEAT_ITEMS}
                        addItem={addMeat}
                        removeItem={removeMeat}
                        selectedItems={filters.selectedMeatTypes}
                    />

                    <FilterCheckboxGroup
                        description={PLACEHOLDERS.sidesType}
                        itemsList={DRAWER_SIDES_ITEMS}
                        addItem={addSides}
                        removeItem={removeSides}
                        selectedItems={filters.selectedSidesTypes}
                    />

                    <AllergensSelectMenu />
                    <FilterTagList isDrawerType={true} />
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
