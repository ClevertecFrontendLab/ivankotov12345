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
import React, { useMemo } from 'react';

import { CARD_DATA } from '~/constants/card-data';
import {
    AUTHORS_LIST,
    DRAWER_MEAT_ITEMS,
    DRAWER_SIDES_ITEMS,
} from '~/constants/drawer-filter-items';
import { NAV_MENU_ITEMS } from '~/constants/nav-menu';
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

    const allTagsValues = Object.values(filters).flat();

    const allFilterItems = useMemo(
        () =>
            [...categoryItems, ...DRAWER_MEAT_ITEMS, ...DRAWER_SIDES_ITEMS, ...AUTHORS_LIST]
                .filter(({ item }) => allTagsValues.includes(item))
                .map(({ label }) => label)
                .concat(filters.selectedAllergens),
        [allTagsValues, filters],
    );

    const isDisabled = allFilterItems.length === 0;
    return (
        <Drawer isOpen={isOpen} onClose={onClose} placement='right'>
            <DrawerOverlay bg='shadowed' backdropFilter='blur(2px)' />
            <DrawerContent
                data-test-id='filter-drawer'
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
                        data-test-id='close-filter-drawer'
                    />
                </DrawerHeader>

                <DrawerBody as={VStack} alignItems='start' py={0} px={4} gap={6}>
                    <DrawerMenu
                        placeholder='Поиск по категории'
                        items={categoryItems}
                        addItem={addCategory}
                        removeItem={removeCategory}
                        testId='filter-menu-button-категория'
                    />

                    <DrawerMenu
                        placeholder='Поиск по автору'
                        items={AUTHORS_LIST}
                        addItem={addAuthor}
                        removeItem={removeAuthor}
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
                        data-test-id='clear-filter-button'
                    >
                        Очистить фильтр
                    </Button>
                    <Button
                        variant='black'
                        onClick={onFindRecipeClick}
                        isDisabled={isDisabled}
                        data-test-id='find-recipe-button'
                        pointerEvents={isDisabled ? 'none' : 'auto'}
                    >
                        Найти рецепт
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
