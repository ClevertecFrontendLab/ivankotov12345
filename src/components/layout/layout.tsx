import { Box, Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { Aside } from '../aside';
import { Header } from '../header';
import { Navigation } from '../navigation';

const fixedContainer = {
    position: 'fixed',
    top: 'var(--chakra-space-20)',
    height: 'calc(100vh - var(--chakra-space-20))',
};

export const Layout: React.FC = () => (
    <Box height='100vh'>
        <Box justifyItems='center' backgroundColor='lime.50' position='fixed' w='full' zIndex={12}>
            <Header />
        </Box>

        <Box justifyItems='center'>
            <Grid
                gridTemplate='1fr / 256px 1fr 280px'
                maxW='1920px'
                w='full'
                gridTemplateAreas='"nav main aside"'
                position='relative'
            >
                <GridItem sx={fixedContainer} gridArea='nav' pt={6} boxShadow='navBoxShadow'>
                    <Navigation />
                </GridItem>

                <GridItem ml={6} gridArea='main' mt={20}>
                    <Outlet />
                </GridItem>

                <GridItem
                    gridArea='aside'
                    sx={fixedContainer}
                    justifySelf='end'
                    maxW='280px'
                    w='full'
                >
                    <Aside />
                </GridItem>
            </Grid>
        </Box>
    </Box>
);
