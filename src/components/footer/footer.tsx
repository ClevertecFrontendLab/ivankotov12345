import { EditIcon, SearchIcon } from '@chakra-ui/icons';
import { Avatar, SimpleGrid, Text, VStack } from '@chakra-ui/react';

import avatar from '~/assets/img/avatar.jpg';
import { COLORS_BLACK_ALPHA } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';

import { HomeIcon } from '../icons';
import { FooterItem } from './footer-item';

export const Footer: React.FC = () => (
    <SimpleGrid as='footer' columns={4} spacing={0} w={SIZES.full} overflow='hidden'>
        <FooterItem icon={<HomeIcon />} description='Главная' variant='highlighted' />
        <FooterItem
            icon={<SearchIcon w={6} h={6} />}
            description='Поиск'
            textColor={COLORS_BLACK_ALPHA[600]}
            variant={STYLE_VARIANTS.none}
        />
        <FooterItem
            icon={<EditIcon w={6} h={6} />}
            description='Записать'
            textColor={COLORS_BLACK_ALPHA[600]}
            variant={STYLE_VARIANTS.none}
        />

        <VStack gap={1} py={2.5}>
            <Avatar src={avatar} w={10} h={10} name='Екатерина Константинопольская' />
            <Text fontSize='xs' color={COLORS_BLACK_ALPHA[600]}>
                Мой профиль
            </Text>
        </VStack>
    </SimpleGrid>
);
