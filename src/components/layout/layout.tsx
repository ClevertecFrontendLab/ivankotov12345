import { Box, Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { Aside } from '../aside';
import { Footer } from '../footer';
import { Header } from '../header';
import { Navigation } from '../navigation';

const fixedContainer = {
    position: 'fixed',
    top: 'var(--chakra-space-20)',
    height: 'calc(100vh - var(--chakra-space-20))',
};

export const Layout: React.FC = () => (
    <Box height='100vh'>
        <Box
            as='header'
            justifyItems='center'
            bg='lime.50'
            position='fixed'
            w='full'
            zIndex={12}
            data-test-id='header'
        >
            <Header />
        </Box>

        <Box justifyItems='center'>
            <Grid
                gridTemplate={{
                    base: '1fr / 1fr',
                    lg: '1fr / 256px 1fr clamp(220px, 20%, 260px)',
                }}
                maxW='1920px'
                gridTemplateAreas={{
                    base: '"main"',
                    lg: `"nav main aside"
                        "footer footer footer"`,
                }}
                position='relative'
            >
                <GridItem
                    sx={fixedContainer}
                    gridArea='nav'
                    pt={6}
                    display={{ base: 'none', lg: 'block' }}
                >
                    <Navigation />
                </GridItem>

                <GridItem mt={{ base: 12, lg: 20 }} px={5} gridArea='main' overflow='hidden'>
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
                    bg='lime.50'
                    w='full'
                    data-test-id='footer'
                    display={{ base: 'block', lg: 'none' }}
                >
                    <Footer />
                </GridItem>
            </Grid>
        </Box>
    </Box>
);
