import { Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { Header } from '../header';
import { Navigation } from '../navigation';

export const Layout: React.FC = () => (
    <Grid gridTemplateRows='80px 1fr' height='100vh'>
        <GridItem justifyItems='center' backgroundColor='lime.50'>
            <Header />
        </GridItem>

        <GridItem justifyItems='center'>
            <Grid gridTemplate='1fr / 256px 1fr 280px' maxW='1920px' w='full'>
                <GridItem>
                    <Navigation />
                </GridItem>

                <GridItem ml={6}>
                    <Outlet />
                </GridItem>

                <GridItem>
                    <div>aside</div>
                </GridItem>
            </Grid>
        </GridItem>
    </Grid>
);
