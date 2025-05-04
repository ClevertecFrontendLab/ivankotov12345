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
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { openDrawer, selectFilterDrawer } from '~/store/slices/filter-drawer-slice';
import {
    removeIsFiltered,
    selectFilter,
    selectIsFiltered,
    setIsFiltered,
} from '~/store/slices/filters-slice';
import { clearFilterRecipes, selectRecipes } from '~/store/slices/recipe-slice';
import { selectSearchInput, setSearchInputValue } from '~/store/slices/search-input-slice';

import { AllergensSelectMenu } from './allergens-select-menu';
import { FilterDrawer } from './filter-drawer';
import { FilterIcon } from './filter-icon';
import { checkFiltersEmpty } from './helpers/check-empty';

type SearchPanelProps = {
    setIsSearchFocused: (isElementFocused: boolean) => void;
    isSearchFocused: boolean;
};

const MIN_SEARCH_VALUE_LENGTH = 3;

export const SearchPanel: React.FC<SearchPanelProps> = ({
    setIsSearchFocused,
    isSearchFocused,
}) => {
    const [isTablet] = useMediaQuery('(max-width: 74rem)');

    const [currentSearchValue, setCurrentSearchValue] = useState('');
    const [hasSearchError, setHasSearchError] = useState(false);
    const { ...filters } = useAppSelector(selectFilter);
    const { isOpen } = useAppSelector(selectFilterDrawer);
    const { filteredRecipes } = useAppSelector(selectRecipes);
    const isFiltered = useAppSelector(selectIsFiltered);
    const { searchInputValue } = useAppSelector(selectSearchInput);

    const dispatch = useAppDispatch();

    const isSearchButtonDisabled = useMemo(
        () => currentSearchValue.length < MIN_SEARCH_VALUE_LENGTH,
        [currentSearchValue],
    );

    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const value = event.target.value.trim().toLowerCase();
        setCurrentSearchValue(value);
        setHasSearchError(false);
    };

    const onSearchClick = () => {
        dispatch(setIsFiltered());
        dispatch(setSearchInputValue(currentSearchValue));
        setHasSearchError(filteredRecipes.length === 0);
    };

    useEffect(() => {
        if (isFiltered && filteredRecipes.length === 0 && isSearchFocused) {
            setHasSearchError(true);
        } else {
            setHasSearchError(false);
        }
    }, [isFiltered, filteredRecipes, isSearchFocused]);

    useEffect(() => {
        const isFiltersEmpty = checkFiltersEmpty(filters);

        if (searchInputValue.length === 0 && isFiltersEmpty && !isOpen) {
            if (filteredRecipes.length > 0) {
                dispatch(clearFilterRecipes());
                dispatch(removeIsFiltered());
            }
        }
    }, [dispatch, filters, searchInputValue, filteredRecipes, isOpen]);
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
