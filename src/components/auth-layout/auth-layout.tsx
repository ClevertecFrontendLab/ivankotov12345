import {
    Box,
    Center,
    HStack,
    Image,
    SimpleGrid,
    Tab,
    TabList,
    Tabs,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';

import authBackground from '~/assets/img/auth-background.jpg';
import pan from '~/assets/svg/pan.svg';
import yeeDaa from '~/assets/svg/yee-daa.svg';
import { COLORS } from '~/constants/colors';
import { ROUTER_PATHS } from '~/constants/router-paths';
import { AUTH_SIZES, SIZES } from '~/constants/sizes';
import { useAppSelector } from '~/store/hooks';
import { selectApp } from '~/store/slices/app-slice';

import { Loader } from '../loader';

const tabs = [ROUTER_PATHS.signIn, ROUTER_PATHS.signUp];

export const AuthLayout: React.FC = () => {
    const { pathname } = useLocation();

    const { isLoading } = useAppSelector(selectApp);

    const activeTabIndex = useMemo(
        () => tabs.findIndex((tabItem) => tabItem === pathname),
        [pathname],
    );
    return (
        <Box background={COLORS.bgAuth}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} minH={SIZES.fullWieportHeight}>
                <Center pb={20}>
                    <VStack
                        w={{ base: 'full', md: AUTH_SIZES.widthMd, lg: AUTH_SIZES.widthLg }}
                        mx={4}
                        gap={0}
                    >
                        <HStack alignItems='flex-end' mb={{ base: 14, lg: 20 }}>
                            <Image src={pan} alt='pan' w={{ base: 'auto', lg: 16 }} />
                            <Image src={yeeDaa} alt='yee daa' w={{ base: 'auto', lg: 48 }} />
                        </HStack>

                        <Tabs variant='limeTabs' w='full' defaultIndex={activeTabIndex} mb={10}>
                            <TabList justifyContent='start'>
                                <Tab as={NavLink} to={ROUTER_PATHS.signIn} px={6} py={3}>
                                    Вход на сайт
                                </Tab>

                                <Tab as={NavLink} to={ROUTER_PATHS.signUp} px={6} py={3}>
                                    Регистрация
                                </Tab>
                            </TabList>
                        </Tabs>

                        <Outlet />
                    </VStack>
                </Center>

                <Box
                    bgImage={authBackground}
                    display={{ base: 'none', lg: 'block' }}
                    bgSize='cover'
                    bgPos='center'
                />
            </SimpleGrid>

            <HStack position='absolute' justifyContent='space-between' w='full' bottom={0} p={7}>
                <Text fontSize='xs' fontWeight='semibold'>
                    Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
                </Text>
                <Text fontSize='xs' fontWeight='semibold' display={{ base: 'none', lg: 'block' }}>
                    - Лучший сервис для ваших кулинарных побед
                </Text>
            </HStack>

            <Loader isLoading={isLoading} />
        </Box>
    );
};
