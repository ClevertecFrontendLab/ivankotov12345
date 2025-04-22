import { Button, Center, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router';

import { CARD_DATA } from '~/constants/card-data';
import { NAV_MENU_ITEMS } from '~/constants/nav-menu';
import { useAllergenFilter } from '~/hooks/useAllergenFilter';
import { useAppSelector } from '~/store/hooks';
import { selectFilteredRecipes } from '~/store/slices/flter-recipe-slice';

import { CardsWrapper } from '../cards-wrapper';
import { FoodCard } from '../food-card';

export const TabsSection: React.FC = () => {
    const { pathname } = useLocation();
    const { filteredRecipes } = useAppSelector(selectFilteredRecipes);

    const [currentCategory, currentSubcategory] = pathname.split('/').filter(Boolean);

    const tabs = NAV_MENU_ITEMS.find((item) => item.path === `/${currentCategory}`)?.subcategories;
    const activeIndex = tabs?.findIndex((tab) => tab.path === `/${currentSubcategory}`);

    const currentCategoryRecipesList = useMemo(
        () =>
            CARD_DATA.filter(({ category }) => category.includes(currentCategory)).filter(
                ({ subcategory }) => subcategory.includes(currentSubcategory),
            ),
        [currentCategory, currentSubcategory],
    );

    useAllergenFilter(currentCategoryRecipesList);

    const tabCardData = filteredRecipes.length
        ? filteredRecipes
        : currentCategoryRecipesList.slice(0, 8);

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
                                {tabCardData.map((props) => (
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
