import { Button, Center, Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';
import { memo, useEffect, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router';

import { CARD_DATA } from '~/constants/card-data';
import { NAV_MENU_ITEMS } from '~/constants/nav-menu';
import { useAllergenFilter } from '~/hooks/use-allergen-filters';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectFilteredRecipes, setCurrentRecipes } from '~/store/slices/flter-recipe-slice';

import { CardsWrapper } from '../cards-wrapper';
import { FoodCard } from '../food-card';

export const TabsSection: React.FC = memo(() => {
    const { pathname } = useLocation();
    const { currentRecipes, filteredRecipes } = useAppSelector(selectFilteredRecipes);
    const dispatch = useAppDispatch();

    const [currentCategory, currentSubcategory] = pathname.split('/').filter(Boolean);

    const tabs = useMemo(
        () => NAV_MENU_ITEMS.find((item) => item.path === currentCategory)?.subcategories,
        [currentCategory],
    );
    const activeIndex = useMemo(
        () => tabs?.findIndex((tab) => tab.path === currentSubcategory),
        [currentSubcategory, tabs],
    );

    const currentCategoryRecipesList = useMemo(
        () =>
            CARD_DATA.filter(({ category }) => category.includes(currentCategory))
                .filter(({ subcategory }) => subcategory.includes(currentSubcategory))
                .sort((a, b) => +a.id - +b.id),
        [currentCategory, currentSubcategory],
    );

    useEffect(() => {
        dispatch(setCurrentRecipes(currentCategoryRecipesList));
    }, [dispatch, currentCategoryRecipesList]);

    useAllergenFilter(currentCategoryRecipesList);

    const tabCardData = useMemo(
        () => (filteredRecipes.length ? filteredRecipes : currentRecipes.slice(0, 8)),
        [filteredRecipes, currentRecipes],
    );
    return (
        <Tabs as='section' mb={10} index={activeIndex} variant='limeTabs'>
            <TabList>
                {tabs &&
                    tabs.map(({ category, path }, index) => (
                        <Tab
                            as={NavLink}
                            to={`/${currentCategory}/${path}`}
                            key={category}
                            data-test-id={`tab-${path}-${index}`}
                        >
                            {category}
                        </Tab>
                    ))}
            </TabList>

            <TabPanels mt={6}>
                <CardsWrapper>
                    {tabCardData.map((props, index) => (
                        <FoodCard {...props} key={props.id} index={index} />
                    ))}
                </CardsWrapper>

                <Center>
                    <Button bg='lime.400' px={5}>
                        Загрузить ещё
                    </Button>
                </Center>
            </TabPanels>
        </Tabs>
    );
});
