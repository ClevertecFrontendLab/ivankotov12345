import { EditIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Spacer, Text, VStack } from '@chakra-ui/react';

import { FavoriteIcon, LikeIcon, PeopleIcon } from '../icons';
import { StatButton } from '../stat-button';

export const Aside: React.FC = () => (
    <Flex direction='column' h='full'>
        <VStack px={16} py={4} gap={6} alignItems='flex-end'>
            <StatButton quantity={185} icon={<LikeIcon />} size='md' />
            <StatButton quantity={589} icon={<PeopleIcon />} size='md' />
            <StatButton quantity={587} icon={<FavoriteIcon />} size='md' />
        </VStack>

        <Spacer />

        <VStack pb={14} pl={20}>
            <IconButton
                aria-label='edit button'
                icon={<EditIcon w={6} h={6} />}
                variant='black'
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
