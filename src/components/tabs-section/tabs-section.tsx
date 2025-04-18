import { Button, Center, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router';

import { CARD_DATA } from '~/constants/card-data';
import { NAV_MENU_ITEMS } from '~/constants/nav-menu';

import { CardsWrapper } from '../cards-wrapper';
import { FoodCard } from '../food-card';

export const TabsSection: React.FC = () => {
    const { pathname } = useLocation();

    const [category, subCategory] = pathname.split('/').filter(Boolean);

    const tabs = NAV_MENU_ITEMS.find((item) => item.path === `/${category}`)?.subCategories;
    const activeIndex = tabs?.findIndex((tab) => tab.path === `/${subCategory}`);
    return (
        <Tabs as='section' mb={10} index={activeIndex}>
            <TabList
                flexWrap='wrap'
                justifyContent='center'
                alignItems='center'
                gap={1}
                pb={0}
                borderBottom='1px solid'
                borderColor='blackAlpha.200'
            >
                {tabs &&
                    tabs.map(({ category: itemCategory, path }) => (
                        <Tab
                            as={NavLink}
                            to={`/${category}${path}`}
                            key={itemCategory}
                            flexShrink={0}
                            color='lime.800'
                            _selected={{
                                color: 'lime.600',
                                borderColor: 'lime.600',
                            }}
                            py={{ base: 0, lg: 2 }}
                        >
                            {itemCategory}
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
};
