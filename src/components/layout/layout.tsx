import { Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router';

export const Layout = () => (
    <Grid
        gridTemplateAreas={`"header header header"
                            "navigation main aside"`}
        gridTemplateColumns='256px 1fr 200px'
        gridTemplateRows='80px 1fr'
    >
        <GridItem area='header'>
            <div>header</div>
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
