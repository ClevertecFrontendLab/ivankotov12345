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
    VStack,
} from '@chakra-ui/react';

import { FilterIcon } from './filter-icon';

export const SearchPanel: React.FC = () => (
    <VStack w='full' px={48} gap={4}>
        <HStack w='full'>
            <IconButton
                aria-label='filter button'
                icon={<FilterIcon />}
                variant='outline'
                size='lg'
                borderColor='blackAlpha.600'
            />
            <InputGroup size='lg'>
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

        <HStack w='full' gap={4}>
            <HStack gap={8}>
                <Text whiteSpace='nowrap' fontWeight='medium'>
                    Исключить мои аллергены
                </Text>
                <Switch />
            </HStack>

            <Select placeholder='Выберите из списка...' />
        </HStack>
    </VStack>
);
