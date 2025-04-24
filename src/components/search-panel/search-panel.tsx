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
import { useEffect } from 'react';

import { useAppDispatch } from '~/store/hooks';
import { openDrawer } from '~/store/slices/filter-drawer-slice';
import { clearFilters } from '~/store/slices/filters-slice';
import { clearFilterRecipes } from '~/store/slices/flter-recipe-slice';

import { AllergensSelectMenu } from '../allergens-select-menu';
import { FilterDrawer } from '../filter-drawer';
import { FilterIcon } from './filter-icon';

export const SearchPanel: React.FC = () => {
    const [isTablet] = useMediaQuery('(max-width: 74rem)');
    const dispatch = useAppDispatch();

    useEffect(
        () => () => {
            dispatch(clearFilters());
            dispatch(clearFilterRecipes());
        },
        [dispatch],
    );
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
                    />
                    <InputRightElement>
                        <SearchIcon />
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
