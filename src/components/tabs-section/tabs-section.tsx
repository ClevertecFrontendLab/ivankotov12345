import { Button, Center, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router';

import { CARD_DATA } from '~/constants/card-data';
import { NAV_MENU_ITEMS } from '~/constants/nav-menu';

import { CardsWrapper } from '../cards-wrapper';
import { FoodCard } from '../food-card';

export const TabsSection: React.FC = () => {
    const { pathname } = useLocation();

    const [currentCategory, currentSubcategory] = pathname.split('/').filter(Boolean);

    const tabs = NAV_MENU_ITEMS.find((item) => item.path === `/${currentCategory}`)?.subcategories;
    const activeIndex = tabs?.findIndex((tab) => tab.path === `/${currentSubcategory}`);

    const currentCategoryRecepiesList = CARD_DATA.filter(({ category }) =>
        category.includes(currentCategory),
    )
        .filter(({ subcategory }) => subcategory.includes(currentSubcategory))
        .slice(0, 8);

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
                    tabs.map(({ category, path }) => (
                        <Tab
                            as={NavLink}
                            to={`/${currentCategory}${path}`}
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
                                {currentCategoryRecepiesList.map((props) => (
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
