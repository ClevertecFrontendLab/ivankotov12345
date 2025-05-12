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
import { SIZES } from '~/constants/sizes';

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
                    <VStack>
                        <HStack alignItems='flex-end'>
                            <Image src={pan} alt='pan' />
                            <Image src={yeeDaa} alt='yee daa' />
                        </HStack>

                        <Tabs variant='limeTabs' defaultIndex={activeTabIndex}>
                            <TabList>
                                <Tab as={NavLink} to={ROUTER_PATHS.signIn}>
                                    Вход на сайт
                                </Tab>

                                <Tab as={NavLink} to={ROUTER_PATHS.signUp}>
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
