import { EditIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Spacer, Text, VStack } from '@chakra-ui/react';

import { Stats } from '../stats';

export const Aside: React.FC = () => (
    <Flex direction='column' h='full' position='relative'>
        <Stats size='md' />

        <Spacer />

        <VStack pb={14} pl={14}>
            <IconButton
                aria-label='edit button'
                icon={<EditIcon w={6} h={6} />}
                bg='black'
                color='white'
                borderRadius='full'
                size='lg'
                variant='highlighted'
            />
            <Text fontSize='xs' color='blackAlpha.600'>
                Записать рецепт
            </Text>
        </VStack>
    </Flex>
);
