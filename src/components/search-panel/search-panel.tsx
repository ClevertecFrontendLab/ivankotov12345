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

import { AllergensSelect } from '../allergens-select';
import { FilterIcon } from './filter-icon';

export const SearchPanel: React.FC = () => {
    const [isTablet] = useMediaQuery('(max-width: 74rem)');
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
                />
                <InputGroup size={{ base: 'sm', lg: 'lg' }}>
                    <Input
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
                <HStack w='full' gap={4}>
                    <AllergensSelect />
                </HStack>
            )}
        </VStack>
    );
};
