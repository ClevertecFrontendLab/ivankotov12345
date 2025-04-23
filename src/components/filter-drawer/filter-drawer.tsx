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
import React from 'react';

import { CARD_DATA } from '~/constants/card-data';
import {
    AUTHORS_LIST,
    DRAWER_MEAT_ITEMS,
    DRAWER_SIDES_ITEMS,
} from '~/constants/drawer-filter-items';
import { NAV_MENU_ITEMS } from '~/constants/nav-menu';
import {
    filterRecipesByAllergens,
    filterRecipesByAuthorType,
    filterRecipesByCategories,
    filterRecipesByMeatType,
    filterRecipesBySidesType,
} from '~/helpers/filter-recipe';
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

const categoryItems = NAV_MENU_ITEMS.map((item) => ({
    label: item.category,
    item: item.path,
}));

export const FilterDrawer: React.FC = () => {
    const { isOpen } = useAppSelector(selectFilterDrawer);
    const { ...filters } = useAppSelector(selectFilter);
    const dispatch = useAppDispatch();

    const onClose = () => {
        dispatch(clearFilters());
        dispatch(closeDrawer());
    };

    const onFindRecipeClick = () => {
        let currentCardData = [...CARD_DATA];
        currentCardData = filterRecipesByCategories(filters.selectedCategories, currentCardData);
        currentCardData = filterRecipesByAuthorType(filters.selectedAuthors, currentCardData);
        currentCardData = filterRecipesByMeatType(filters.selectedMeatTypes, currentCardData);
        currentCardData = filterRecipesBySidesType(filters.selectedSidesTypes, currentCardData);
        currentCardData = filterRecipesByAllergens(filters.selectedSidesTypes, currentCardData);
        dispatch(setFilteredRecipes(currentCardData));
        dispatch(closeDrawer());
    };

    return (
        <Drawer isOpen={isOpen} onClose={onClose} placement='right' size='sm'>
            <DrawerOverlay bg='shadowed' backdropFilter='blur(2px)' />

            <DrawerContent>
                <DrawerHeader as={Flex} px={8} pt={8} pb={10}>
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
                    />
                </DrawerHeader>

                <DrawerBody as={VStack} alignItems='start' py={0} px={8} gap={6}>
                    <DrawerMenu
                        placeholder='Поиск по категории'
                        items={categoryItems}
                        addItem={addCategory}
                        removeItem={removeCategory}
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
                </DrawerBody>

                <DrawerFooter justifyContent='center' p={8} gap={2}>
                    <Button variant='outline'>Очистить фильтр</Button>
                    <Button variant='black' onClick={onFindRecipeClick}>
                        Найти рецепт
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
