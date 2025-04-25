import { SearchIcon } from '@chakra-ui/icons';
import {
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    useMediaQuery,
    VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { CARD_DATA } from '~/constants/card-data';
import { filterRecipesBySearch } from '~/helpers/filter-recipe';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { openDrawer } from '~/store/slices/filter-drawer-slice';
import { clearFilters } from '~/store/slices/filters-slice';
import {
    clearFilterRecipes,
    selectFilteredRecipes,
    setFilteredRecipes,
} from '~/store/slices/flter-recipe-slice';
import { setSearchInputValue } from '~/store/slices/search-input-slice';

import { AllergensSelectMenu } from '../allergens-select-menu';
import { FilterDrawer } from '../filter-drawer';
import { FilterIcon } from './filter-icon';

export const SearchPanel: React.FC = () => {
    const [isTablet] = useMediaQuery('(max-width: 74rem)');
    const dispatch = useAppDispatch();
    const [currentSearchValue, setCurrentSearchValue] = useState('');
    const { filteredRecipes } = useAppSelector(selectFilteredRecipes);

    const isSearchButtonDisabled = currentSearchValue.length < 3;

    useEffect(
        () => () => {
            dispatch(clearFilters());
            dispatch(clearFilterRecipes());
        },
        [dispatch],
    );

    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.trim().toLowerCase();
        setCurrentSearchValue(value);
    };

    const onSearchClick = () => {
        dispatch(setSearchInputValue(currentSearchValue));

        const currSearchArr = filteredRecipes.length ? filteredRecipes : CARD_DATA;
        const filtered = filterRecipesBySearch(currentSearchValue, currSearchArr);
        dispatch(setFilteredRecipes(filtered));
    };

    return (
        <VStack w='full' px={{ md: 36, lg: 48 }} gap={4}>
            <HStack w='full'>
                <IconButton
                    aria-label='filter'
                    icon={<FilterIcon />}
                    variant='outline'
                    size={{ base: 'sm', lg: 'lg' }}
                    width={{ base: 8, lg: 12 }}
                    borderColor='blackAlpha.600'
                    px={0}
                    onClick={() => dispatch(openDrawer())}
                    data-test-id='filter-button'
                />
                <InputGroup size={{ base: 'sm', lg: 'lg' }}>
                    <Input
                        name='search'
                        placeholder='Название или ингредиент...'
                        borderColor='blackAlpha.600'
                        _focus={{
                            borderColor: 'blackAlpha.600',
                        }}
                        _hover={{
                            borderColor: 'blackAlpha.600',
                        }}
                        onChange={onSearchChange}
                        data-test-id='search-input'
                    />

                    <InputRightElement>
                        <IconButton
                            pointerEvents={isSearchButtonDisabled ? 'none' : 'auto'}
                            aria-label='search'
                            variant='none'
                            icon={<SearchIcon />}
                            disabled={isSearchButtonDisabled}
                            onClick={onSearchClick}
                            data-test-id='search-button'
                        />
                    </InputRightElement>
                </InputGroup>
            </HStack>

            {!isTablet && (
                <HStack w='full' gap={4} maxH={12} h='full'>
                    <AllergensSelectMenu />
                </HStack>
            )}

            <FilterDrawer />
        </VStack>
    );
};
