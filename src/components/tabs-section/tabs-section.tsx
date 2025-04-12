import { Button, Center, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { NavLink } from 'react-router';

import { CARD_DATA } from '~/constants/card-data';
import { NAV_MENU_ITEMS } from '~/constants/nav-menu';
import { ROUTER_PATHS } from '~/constants/router-paths';

import { CardsWrapper } from '../cards-wrapper';
import { FoodCard } from '../food-card';

const tabs = NAV_MENU_ITEMS.find((item) => item.category === 'Веганская кухня')?.subCategories;

export const TabsSection: React.FC = () => (
    <Tabs as='section' mb={10}>
        <TabList
            justifyContent='center'
            overflow='hidden'
            gap={1}
            borderBottom='1px solid'
            borderColor='blackAlpha.200'
        >
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
                        py={{ base: 0, lg: 2 }}
                    >
                        {category}
                    </Tab>
                ))}
        </TabList>

        <TabPanels>
            {tabs &&
                tabs.map(({ category }) => (
                    <TabPanel key={category} pt={6} px={0}>
                        <CardsWrapper>
                            {CARD_DATA.map((props) => (
                                <FoodCard {...props} key={props.id} />
                            ))}
                        </CardsWrapper>
                    </TabPanel>
                ))}

            <Center>
                <Button bg='lime.400' px={5}>
                    Загрузить ещё
                </Button>
            </Center>
        </TabPanels>
    </Tabs>
);
