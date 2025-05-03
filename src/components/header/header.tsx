import { Flex, HStack, Image, Spacer, Stack, useMediaQuery } from '@chakra-ui/react';

import avatar from '~/assets/img/avatar.jpg';
import { COLORS, COLORS_LIME } from '~/constants/colors';
import { ROUTER_PATHS } from '~/constants/router-paths';
import { usePathItems } from '~/hooks/use-path-items';
import { useAppSelector } from '~/store/hooks';
import { selectBurger } from '~/store/slices/burger-slice';

import { Breadcrumbs } from '../breadcrumbs';
import { Stats } from '../stats';
import { User } from '../user';
import pan from './assets/svg/pan.svg';
import yeeDaa from './assets/svg/yee-daa.svg';
import { BurgerMenu } from './burger-menu';

export const Header: React.FC = () => {
    const [isTablet] = useMediaQuery('(max-width: 74rem)');
    const { secondItemPath } = usePathItems();
    const { isOpen } = useAppSelector(selectBurger);
    return (
        <Flex
            maxW='1920px'
            w='full'
            h='full'
            alignItems='center'
            py={{ base: 1, lg: 4 }}
            pl={{ base: 5, lg: 4 }}
            pr={{ base: 5, lg: 24 }}
            bg={isOpen ? COLORS.white : COLORS_LIME[50]}
        >
            <Stack direction='row' alignItems='flex-end'>
                <Image src={pan} alt='pan' />
                <Image src={yeeDaa} alt='yee daa' display={{ base: 'none', md: 'block' }} />
            </Stack>

            {!isTablet && `/${secondItemPath}` !== ROUTER_PATHS.notFound && <Breadcrumbs />}

            <Spacer />

            {!isTablet && (
                <User avatar={avatar} name='Екатерина Константинопольская' email='@bake_and_pie' />
            )}

            <HStack display={{ base: 'flex', lg: 'none' }}>
                <Stats size='xs' isOpen={isOpen} />
                <BurgerMenu />
            </HStack>
        </Flex>
    );
};
