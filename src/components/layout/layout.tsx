import { Box, Grid, GridItem, useMediaQuery } from '@chakra-ui/react';
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

export const Layout: React.FC = () => {
    const [isTablet] = useMediaQuery('(max-width: 74rem)');
    return (
        <Box height='100vh'>
            <Box justifyItems='center' bg='lime.50' position='fixed' w='full' zIndex={12}>
                <Header />
            </Box>

            <Box justifyItems='center'>
                <Grid
                    gridTemplate={{
                        base: '1fr / 1fr',
                        lg: '1fr / 256px 1fr clamp(220px, 20%, 260px)',
                    }}
                    maxW='1920px'
                    gridTemplateAreas={{ base: '"main"', lg: '"nav main aside"' }}
                    position='relative'
                >
                    <GridItem
                        sx={fixedContainer}
                        gridArea='nav'
                        pt={6}
                        boxShadow='navBoxShadow'
                        display={{ base: 'none', lg: 'block' }}
                    >
                        <Navigation />
                    </GridItem>

                    <GridItem
                        mt={{ base: 12, lg: 20 }}
                        px={{ base: 5, lg: 6 }}
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
                </Grid>
            </Box>

            {isTablet && (
                <Box
                    position='fixed'
                    bottom={0}
                    justifyItems='center'
                    bg='lime.50'
                    w='full'
                    zIndex={15}
                >
                    <Footer />
                </Box>
            )}
        </Box>
    );
};
