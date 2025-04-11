import { SearchIcon } from '@chakra-ui/icons';
import {
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Switch,
    Text,
    useMediaQuery,
    VStack,
} from '@chakra-ui/react';

import { FilterIcon } from './filter-icon';

export const SearchPanel: React.FC = () => {
    const [isTablet] = useMediaQuery('(max-width: 74rem)');

    return (
        <VStack w='full' px={{ md: 36, lg: 48 }} gap={4}>
            <HStack w='full'>
                <IconButton
                    aria-label='filter button'
                    icon={<FilterIcon />}
                    variant='outline'
                    size={{ base: 'sm', lg: 'lg' }}
                    width={{ base: 8, lg: 12 }}
                    borderColor='blackAlpha.600'
                    px='0'
                />
                <InputGroup size={{ base: 'sm', lg: 'lg' }}>
                    <Input
                        placeholder='Название или ингредиент...'
                        borderColor='blackAlpha.600'
                        _placeholder={{
                            color: 'lime.800',
                        }}
                    />
                    <InputRightElement>
                        <SearchIcon />
                    </InputRightElement>
                </InputGroup>
            </HStack>

            {!isTablet && (
                <HStack w='full' gap={4}>
                    <HStack gap={8}>
                        <Text whiteSpace='nowrap' fontWeight='medium'>
                            Исключить мои аллергены
                        </Text>
                        <Switch />
                    </HStack>

                    <Select placeholder='Выберите из списка...' />
                </HStack>
            )}
        </VStack>
    );
};
