import { Button, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { NavLink } from 'react-router';

import { CARD_DATA } from '~/constants/card-data';
import { NAV_MENU_ITEMS } from '~/constants/nav-menu';
import { ROUTER_PATHS } from '~/constants/router-paths';

import { CardsWrapper } from '../cards-wrapper';
import { FoodCard } from '../food-card';

const tabs = NAV_MENU_ITEMS.find((item) => item.category === 'Веганские блюда')?.subCategories;

export const TabsSection: React.FC = () => (
    <Tabs as='section'>
        <TabList>
            {tabs &&
                tabs.map(({ category, path }) => (
                    <Tab
                        as={NavLink}
                        to={`${ROUTER_PATHS.veganPage}${path}`}
                        key={category}
                        flexShrink={0}
                        color='lime.800'
                        _selected={{
                            color: 'lime.600',
                            borderColor: 'lime.600',
                        }}
                    >
                        {category}
                    </Tab>
                ))}
        </TabList>

        <TabPanels>
            {tabs &&
                tabs.map(({ category }) => (
                    <TabPanel key={category}>
                        <CardsWrapper>
                            {CARD_DATA.map((props) => (
                                <FoodCard {...props} key={props.id} />
                            ))}
                        </CardsWrapper>
                    </TabPanel>
                ))}
            <Button bg='lime.400'>Загрузить ещё</Button>
        </TabPanels>
    </Tabs>
);
