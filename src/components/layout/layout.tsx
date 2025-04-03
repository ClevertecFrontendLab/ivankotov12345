import { Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { Header } from '../header';

export const Layout: React.FC = () => (
    <Grid
        gridTemplateAreas={`"header header header"
                            "navigation main aside"`}
        gridTemplateColumns='256px 1fr 200px'
        gridTemplateRows='80px 1fr'
        height='100vh'
    >
        <GridItem area='header' justifyItems='center' backgroundColor='lime.50'>
            <Header />
        </GridItem>

        <GridItem area='navigation'>
            <div>navigation</div>
        </GridItem>

        <GridItem area='main'>
            <Outlet />
        </GridItem>

        <GridItem area='aside'>
            <div>aside</div>
        </GridItem>
    </Grid>
);
