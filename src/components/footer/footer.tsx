import { EditIcon, SearchIcon } from '@chakra-ui/icons';
import { Avatar, SimpleGrid, Text, VStack } from '@chakra-ui/react';

import avatar from '~/assets/img/avatar.jpg';

import { HomeIcon } from '../icons';
import { FooterItem } from './footer-item';

export const Footer: React.FC = () => (
    <SimpleGrid
        as='footer'
        columns={4}
        spacing={0}
        py={2.5}
        w='full'
        overflow='hidden'
        data-test-id='footer'
    >
        <FooterItem icon={<HomeIcon />} description='Главная' variant='highlighted' />
        <FooterItem
            icon={<SearchIcon w={6} h={6} />}
            description='Поиск'
            textColor='blackAlpha.600'
            variant='ghost'
        />
        <FooterItem
            icon={<EditIcon w={6} h={6} />}
            description='Записать'
            textColor='blackAlpha.600'
            variant='ghost'
        />

        <VStack gap={1}>
            <Avatar src={avatar} w={10} h={10} name='Екатерина Константинопольская' />
            <Text fontSize='xs' color='blackAlpha.600'>
                Мой профиль
            </Text>
        </VStack>
    </SimpleGrid>
);
