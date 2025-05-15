import { Box, Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { COLORS_LIME } from '~/constants/colors';
import { DATA_TEST_ID } from '~/constants/test-id';
import { Z_INDEX } from '~/constants/z-index';
import { useGetCategoriesQuery } from '~/query/services/category';
import { useAppSelector } from '~/store/hooks';
import { selectApp } from '~/store/slices/app-slice';

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
    const [isTablet] = useMediaQuery('(max-width: 74rem)');
    const { isLoading: isCategoriesLoading } = useGetCategoriesQuery(undefined);

    const { isResponseStatusOpen } = useAppSelector(selectApp);

    return (
        <Box height='100vh'>
            <Box
                as='header'
                justifyItems='center'
                bg={COLORS_LIME[50]}
                position='fixed'
                w='full'
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
                    w='full'
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
                        w='full'
                        data-test-id={DATA_TEST_ID.footer}
                        display={{ base: 'block', lg: 'none' }}
                    >
                        <Footer />
                    </GridItem>
                </Grid>
            </Box>

            <Loader isLoading={isCategoriesLoading} />
            {isResponseStatusOpen ? <AlertError /> : null}
        </Box>
    );
};
