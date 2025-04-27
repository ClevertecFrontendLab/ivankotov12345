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
import { useEffect, useMemo, useState } from 'react';

import { COLORS_BLACK_ALPHA } from '~/constants/colors';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { DATA_TEST_ID } from '~/constants/test-id';
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

import { AllergensSelectMenu } from './allergens-select-menu';
import { FilterDrawer } from './filter-drawer';
import { FilterIcon } from './filter-icon';

type SearchPanelProps = {
    setIsSearchFocused: (isElementFocused: boolean) => void;
};

const MIN_SEARCH_VALUE_LENGTH = 3;

export const SearchPanel: React.FC<SearchPanelProps> = ({ setIsSearchFocused }) => {
    const [isTablet] = useMediaQuery('(max-width: 74rem)');
    const dispatch = useAppDispatch();
    const [currentSearchValue, setCurrentSearchValue] = useState('');
    const [hasSearchError, setHasSearchError] = useState(false);
    const { currentRecipes, filteredRecipes } = useAppSelector(selectFilteredRecipes);

    const isSearchButtonDisabled = useMemo(
        () => currentSearchValue.length < MIN_SEARCH_VALUE_LENGTH,
        [currentSearchValue],
    );

    useEffect(
        () => () => {
            dispatch(clearFilters());
            dispatch(clearFilterRecipes());
        },
        [dispatch],
    );

    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const value = event.target.value.trim().toLowerCase();
        setCurrentSearchValue(value);
        setHasSearchError(false);
    };

    const onSearchClick = () => {
        dispatch(setSearchInputValue(currentSearchValue));
        const currSearchArr = filteredRecipes.length ? filteredRecipes : currentRecipes;
        const filtered = filterRecipesBySearch(currentSearchValue, currSearchArr);
        dispatch(setFilteredRecipes(filtered));
        setHasSearchError(filtered.length === 0);
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
                    borderColor={COLORS_BLACK_ALPHA[600]}
                    px={0}
                    onClick={() => dispatch(openDrawer())}
                    data-test-id={DATA_TEST_ID.filterButton}
                />
                <InputGroup size={{ base: 'sm', lg: 'lg' }}>
                    <Input
                        data-test-id={DATA_TEST_ID.searchInput}
                        name='search'
                        placeholder={PLACEHOLDERS.search}
                        borderColor={hasSearchError ? 'red.500' : COLORS_BLACK_ALPHA[600]}
                        _focus={{
                            borderColor: isSearchButtonDisabled
                                ? 'red.500 !important'
                                : hasSearchError
                                  ? 'red.500 !important'
                                  : COLORS_BLACK_ALPHA[600],
                        }}
                        _hover={{
                            borderColor: hasSearchError ? 'red.500' : COLORS_BLACK_ALPHA[600],
                        }}
                        onChange={onSearchChange}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />

                    <InputRightElement>
                        <IconButton
                            pointerEvents={isSearchButtonDisabled ? 'none' : 'auto'}
                            aria-label='search'
                            variant='none'
                            icon={<SearchIcon />}
                            disabled={isSearchButtonDisabled}
                            onClick={onSearchClick}
                            data-test-id={DATA_TEST_ID.searchButton}
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
