import { Box, Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useMemo, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { ROUTER_PATHS } from '~/constants/router-paths';
import { COLORS_LIME } from '~/constants/styles/colors';
import { SIZES } from '~/constants/styles/sizes';
import { Z_INDEX } from '~/constants/styles/z-index';
import { DATA_TEST_ID } from '~/constants/test-id';
import { getLocalStorageItem } from '~/helpers/storage';
import { ACCESS_TOKEN_STORAGE_KEY } from '~/query/constants/storage-keys';
import { useRefreshTokenMutation } from '~/query/services/auth';
import { useGetCategoriesQuery } from '~/query/services/category';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectApp, setUserId } from '~/store/slices/app-slice';

import { AlertError } from '../alert-error';
import { Aside } from '../aside';
import { Footer } from '../footer';
import { Header } from '../header';
import { Loader } from '../loader';
import { Navigation } from '../navigation';

const fixedContainer = {
    position: 'fixed',
    top: 'var(--chakra-space-20)',
    height: 'calc(100vh - var(--chakra-space-20))',
};

export const Layout: React.FC = () => {
    const isFirstRender = useRef(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [isTablet] = useMediaQuery('(max-width: 74rem)');
    const { isLoading: isCategoriesLoading } = useGetCategoriesQuery(undefined);

    const { isResponseStatusOpen } = useAppSelector(selectApp);

    const token: string = useMemo(() => getLocalStorageItem(ACCESS_TOKEN_STORAGE_KEY), []);

    const [refreshToken] = useRefreshTokenMutation();

    useEffect(() => {
        if (!token) {
            navigate(ROUTER_PATHS.signIn);
        }
    }, [navigate, token]);

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode<{ userId: string }>(token);
            dispatch(setUserId(decodedToken.userId));
        }
    }, [token, dispatch]);

    useEffect(() => {
        if (isFirstRender.current) {
            refreshToken();
            isFirstRender.current = false;
        }
    }, [isFirstRender, refreshToken]);

    return (
        <Box height='100vh'>
            <Box
                as='header'
                justifyItems='center'
                bg={COLORS_LIME[50]}
                position='fixed'
                w={SIZES.full}
                zIndex={Z_INDEX.layout}
                data-test-id={DATA_TEST_ID.header}
            >
                <Header />
            </Box>

            <Box justifyItems='center'>
                <Grid
                    gridTemplate={{
                        base: '1fr / 1fr',
                        lg: '1fr / 256px 1fr clamp(220px, 20%, 260px)',
                    }}
                    w={SIZES.full}
                    maxW='1920px'
                    gridTemplateAreas={{
                        base: '"main"',
                        lg: `"nav main aside"
                        "footer footer footer"`,
                    }}
                    position='relative'
                >
                    {!isTablet && (
                        <GridItem
                            sx={fixedContainer}
                            gridArea='nav'
                            pt={6}
                            display={{ base: 'none', lg: 'block' }}
                        >
                            <Navigation />
                        </GridItem>
                    )}

                    <GridItem
                        mt={{ base: 12, lg: 20 }}
                        px={{ base: 4, lg: 5 }}
                        gridArea='main'
                        overflow='hidden'
                    >
                        <Outlet />
                    </GridItem>

                    <GridItem
                        gridArea='aside'
                        sx={fixedContainer}
                        justifySelf='end'
                        minW='220px'
                        maxW='260px'
                        w='auto'
                        display={{ base: 'none', lg: 'block' }}
                    >
                        <Aside />
                    </GridItem>

                    <GridItem
                        gridArea='footer'
                        position='fixed'
                        bottom={0}
                        justifyItems='center'
                        bg={COLORS_LIME[50]}
                        w={SIZES.full}
                        data-test-id={DATA_TEST_ID.footer}
                        display={{ base: 'block', lg: 'none' }}
                    >
                        <Footer />
                    </GridItem>
                </Grid>
            </Box>

            <Loader isLoading={isCategoriesLoading} />
            {isResponseStatusOpen && <AlertError />}
        </Box>
    );
};
