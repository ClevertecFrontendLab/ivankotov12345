import { Button, Center, Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';
import { memo, useEffect, useMemo } from 'react';
import { NavLink } from 'react-router';

import { CARD_DATA } from '~/constants/card-data';
import { COLORS_LIME } from '~/constants/colors';
import { NAV_MENU_ITEMS } from '~/constants/nav-menu';
import { DATA_TEST_ID } from '~/constants/test-id';
import { useAllergenFilter } from '~/hooks/use-allergen-filters';
import { usePathItems } from '~/hooks/use-path-items';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { selectFilteredRecipes, setCurrentRecipes } from '~/store/slices/flter-recipe-slice';

import { CardsWrapper } from '../../../../components/cards-wrapper';
import { FoodCard } from '../../../../components/food-card';

const CARDS_LENGTH = 8;

export const TabsSection: React.FC = memo(() => {
    const { currentRecipes, filteredRecipes } = useAppSelector(selectFilteredRecipes);
    const dispatch = useAppDispatch();

    const { secondItemPath, thirdItemPath } = usePathItems();

    const tabs = useMemo(
        () => NAV_MENU_ITEMS.find((item) => item.path === secondItemPath)?.subcategories,
        [secondItemPath],
    );
    const activeIndex = useMemo(
        () => tabs?.findIndex((tab) => tab.path === thirdItemPath),
        [thirdItemPath, tabs],
    );

    const currentCategoryRecipesList = useMemo(
        () =>
            CARD_DATA.filter(({ category }) => category.includes(secondItemPath))
                .filter(({ subcategory }) => subcategory.includes(thirdItemPath))
                .sort((a, b) => +a.id - +b.id),
        [secondItemPath, thirdItemPath],
    );

    useEffect(() => {
        dispatch(setCurrentRecipes(currentCategoryRecipesList));
    }, [dispatch, currentCategoryRecipesList]);

    useAllergenFilter(currentCategoryRecipesList);

    const tabCardData = useMemo(
        () => (filteredRecipes.length ? filteredRecipes : currentRecipes.slice(0, CARDS_LENGTH)),
        [filteredRecipes, currentRecipes],
    );
    return (
        <Tabs as='section' mb={10} index={activeIndex} variant='limeTabs'>
            <TabList>
                {tabs &&
                    tabs.map(({ category, path }, index) => (
                        <Tab
                            as={NavLink}
                            to={`/${secondItemPath}/${path}`}
                            key={category}
                            data-test-id={`${DATA_TEST_ID.tab}-${path}-${index}`}
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

                <Center mt={4}>
                    <Button bg={COLORS_LIME[400]} px={5}>
                        Загрузить ещё
                    </Button>
                </Center>
            </TabPanels>
        </Tabs>
    );
});
