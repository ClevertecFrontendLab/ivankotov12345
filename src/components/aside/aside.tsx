import { EditIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Spacer, Text, VStack } from '@chakra-ui/react';

import { FavoriteIcon, LikeIcon, PeopleIcon } from '../icons';
import { StatButton } from '../stat-button';

export const Aside: React.FC = () => (
    <Flex direction='column' h='full'>
        <VStack px={4} py={16}>
            <StatButton quantity={185} icon={<LikeIcon />} size='lg' />
            <StatButton quantity={589} icon={<PeopleIcon />} size='lg' />
            <StatButton quantity={587} icon={<FavoriteIcon />} size='lg' />
        </VStack>

        <Spacer />

        <VStack pb={14}>
            <IconButton
                aria-label='edit button'
                icon={<EditIcon />}
                variant='black'
                borderRadius='full'
            />
            <Text>Записать рецепт</Text>
        </VStack>
    </Flex>
);
