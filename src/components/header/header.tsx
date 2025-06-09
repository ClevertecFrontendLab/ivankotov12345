import { Flex, HStack, Image, Spacer, Stack, useMediaQuery } from '@chakra-ui/react';
import { NavLink } from 'react-router';

import avatar from '~/assets/img/avatar.jpg';
import { ROUTER_PATHS } from '~/constants/router-paths';
import { COLORS, COLORS_LIME } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { DATA_TEST_ID } from '~/constants/test-id';
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
            w={SIZES.full}
            h={SIZES.full}
            alignItems='center'
            py={{ base: 1, lg: 4 }}
            pl={{ base: 5, lg: 4 }}
            pr={{ base: 5, lg: 24 }}
            bg={isOpen ? COLORS.white : COLORS_LIME[50]}
        >
            <Stack
                as={NavLink}
                to={ROUTER_PATHS.homePage}
                direction='row'
                alignItems='flex-end'
                data-test-id={DATA_TEST_ID.headerLogo}
            >
                <Image src={pan} alt='pan' />
                <Image src={yeeDaa} alt='yee daa' display={{ base: 'none', md: 'block' }} />
            </Stack>

            {!isTablet && `/${secondItemPath}` !== ROUTER_PATHS.notFound && <Breadcrumbs />}

            <Spacer />

            {!isTablet && (
                <User
                    avatar={avatar}
                    firstName='Екатерина'
                    lastName='Константинопольская'
                    login='@bake_and_pie'
                    withoutTestId={true}
                />
            )}

            <HStack display={{ base: 'flex', lg: 'none' }}>
                <Stats size='xs' isOpen={isOpen} />
                <BurgerMenu />
            </HStack>
        </Flex>
    );
};
