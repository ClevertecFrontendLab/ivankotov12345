import {
    Box,
    Center,
    HStack,
    Image,
    SimpleGrid,
    Tab,
    TabList,
    Tabs,
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

const tabs = [ROUTER_PATHS.signIn, ROUTER_PATHS.signUp];

export const AuthLayout: React.FC = () => {
    const { pathname } = useLocation();

    const activeTabIndex = useMemo(
        () => tabs.findIndex((tabItem) => tabItem === pathname),
        [pathname],
    );
    return (
        <Box h={SIZES.fullWieportHeight} background={COLORS.bgAuth}>
            <SimpleGrid columns={2} h='full'>
                <Center>
                    <VStack w={AUTH_SIZES.widthLg} alignItems='start' gap={0}>
                        <HStack alignItems='flex-end' ml={20} mb={20}>
                            <Image src={pan} alt='pan' boxSize={16} />
                            <Image src={yeeDaa} alt='yee daa' w={48} />
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

                <Box bgImage={authBackground} bgSize='cover' />
            </SimpleGrid>
        </Box>
    );
};
