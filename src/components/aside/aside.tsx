import { EditIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Spacer, Text, VStack } from '@chakra-ui/react';

import { Stats } from '../stats';

export const Aside: React.FC = () => (
    <Flex direction='column' h='full' position='relative'>
        <Stats size='md' />

        <Spacer />

        <VStack pb={14} pl={5}>
            <IconButton
                aria-label='edit button'
                icon={<EditIcon w={6} h={6} />}
                bg='black'
                color='white'
                borderRadius='full'
                size='lg'
                _after={{
                    content: '""',
                    position: 'absolute',
                    zIndex: -1,
                    w: '208px',
                    h: '208px',
                    bg: 'radial-gradient(50% 50% at 50% 50%, rgba(196, 255, 97, 0.70) 0%, rgba(255, 255, 255, 0.00) 100%)',
                }}
            />
            <Text fontSize='xs' color='blackAlpha.600'>
                Записать рецепт
            </Text>
        </VStack>
    </Flex>
);
