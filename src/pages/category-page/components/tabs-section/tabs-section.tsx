import { Button, Center, Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';
import { memo, useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router';

import { CardsWrapper } from '~/components/cards-wrapper';
import { FoodCard } from '~/components/food-card';
import { COLORS_LIME } from '~/constants/colors';
import { DATA_TEST_ID } from '~/constants/test-id';
import { usePathItems } from '~/hooks/use-path-items';
import { Endpoints } from '~/query/constants/paths';
import { useGetRecipesInfiniteQuery } from '~/query/services/recipe';
import { useAppSelector } from '~/store/hooks';
import { selectCategory } from '~/store/slices/category-slice';

export const TabsSection: React.FC = memo(() => {
    const [isLoadMoreActive, setIsLoadMoreActive] = useState(true);

    const { secondItemPath, thirdItemPath } = usePathItems();
    const { categories } = useAppSelector(selectCategory);

    const tabs = useMemo(
        () => categories.find((item) => item.category === secondItemPath)?.subCategories,
        [secondItemPath, categories],
    );

    const activeTab = useMemo(
        () => tabs?.find((tab) => tab.category === thirdItemPath),
        [thirdItemPath, tabs],
    );

    const activeIndex = useMemo(
        () => tabs?.findIndex((tab) => tab.category === thirdItemPath),
        [thirdItemPath, tabs],
    );

    const { data, fetchNextPage } = useGetRecipesInfiniteQuery({
        endpoint: `${Endpoints.RECIPES_BY_CATEGORY}/${activeTab?._id}`,
    });

    const currentRecipes = useMemo(() => data?.pages.map((element) => element.data).flat(), [data]);

    useEffect(() => {
        const metaTotalRecipes = data?.pages[0].meta.total;

        if (currentRecipes && metaTotalRecipes && currentRecipes.length >= metaTotalRecipes) {
            setIsLoadMoreActive(false);
        }
    }, [currentRecipes, data]);

    const handleLoadMore = () => fetchNextPage();

    return (
        <Tabs as='section' mb={10} index={activeIndex} variant='limeTabs'>
            <TabList>
                {tabs &&
                    tabs.map(({ title, category }, index) => (
                        <Tab
                            as={NavLink}
                            to={`/${secondItemPath}/${category}`}
                            key={category}
                            data-test-id={`${DATA_TEST_ID.tab}-${category}-${index}`}
                        >
                            {title}
                        </Tab>
                    ))}
            </TabList>

            <TabPanels mt={6}>
                <CardsWrapper>
                    {currentRecipes &&
                        currentRecipes.map((props, index) => (
                            <FoodCard {...props} key={props._id} index={index} />
                        ))}
                </CardsWrapper>

                {isLoadMoreActive && (
                    <Center mt={4}>
                        <Button bg={COLORS_LIME[400]} px={5} onClick={handleLoadMore}>
                            Загрузить ещё
                        </Button>
                    </Center>
                )}
            </TabPanels>
        </Tabs>
    );
});
