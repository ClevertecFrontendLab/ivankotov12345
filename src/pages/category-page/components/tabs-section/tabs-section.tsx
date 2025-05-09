import { Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';
import { memo, useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router';

import { CardsWrapper } from '~/components/cards-wrapper';
import { FoodCard } from '~/components/food-card';
import { LoadMoreButton } from '~/components/load-more-button';
import { Loader } from '~/components/loader';
import { PageHeader } from '~/components/page-header';
import { getQueryParams } from '~/components/search-panel/helpers/get-query-params';
import { DATA_TEST_ID } from '~/constants/test-id';
import { usePathItems } from '~/hooks/use-path-items';
import { Endpoints } from '~/query/constants/paths';
import { useGetRecipesInfiniteQuery } from '~/query/services/recipe';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setAllergenDisabled } from '~/store/slices/allergens-slice';
import { selectCategories } from '~/store/slices/category-slice';
import { clearFilters, selectFilter, selectIsFiltered } from '~/store/slices/filters-slice';
import { setFilteredRecipes } from '~/store/slices/recipe-slice';
import { clearSearchInputValue, selectSearchInput } from '~/store/slices/search-input-slice';
import { NavMenuItem } from '~/types/nav-menu';

export const TabsSection: React.FC = memo(() => {
    const [isLoadMoreActive, setIsLoadMoreActive] = useState(true);

    const { secondItemPath, thirdItemPath } = usePathItems();

    const categories = useAppSelector(selectCategories);
    const { ...filters } = useAppSelector(selectFilter);
    const { searchInputValue } = useAppSelector(selectSearchInput);

    const dispatch = useAppDispatch();

    const isFiltered = useAppSelector(selectIsFiltered);

    const queryParams = useMemo(
        () => getQueryParams(filters, searchInputValue),
        [filters, searchInputValue],
    );

    const tabs = useMemo(
        () => categories.find((item) => item.category === secondItemPath)?.subCategories,
        [secondItemPath, categories],
    );

    const activeTab = useMemo(
        () => tabs?.find((tab) => tab.category === thirdItemPath),
        [thirdItemPath, tabs],
    );

    const currentCategory = useMemo(
        () => categories.find(({ _id }) => _id === activeTab?.rootCategoryId),
        [activeTab, categories],
    );

    const { title, description } = currentCategory as NavMenuItem;

    const activeIndex = useMemo(
        () => tabs?.findIndex((tab) => tab.category === thirdItemPath),
        [thirdItemPath, tabs],
    );

    const categoryEndpoint = isFiltered
        ? Endpoints.RECIPE
        : `${Endpoints.RECIPES_BY_CATEGORY}/${activeTab?._id}`;

    const categoryIds = categories
        .find(({ category }) => category === secondItemPath)
        ?.subCategories.map(({ _id }) => _id)
        .toString();

    const { isLoading, isFetching, data, fetchNextPage } = useGetRecipesInfiniteQuery({
        endpoint: categoryEndpoint,
        ...queryParams,
        subcategoriesIds: isFiltered ? categoryIds : undefined,
    });

    const currentRecipes = useMemo(() => data?.pages.map((element) => element.data).flat(), [data]);

    useEffect(() => {
        const metaTotalRecipes = data?.pages[0].meta.total;

        if (currentRecipes && metaTotalRecipes && currentRecipes.length >= metaTotalRecipes) {
            setIsLoadMoreActive(false);
        }
    }, [currentRecipes, data]);

    useEffect(() => {
        if (isFiltered && currentRecipes) {
            setFilteredRecipes(currentRecipes);
        }
    }, [isFiltered, currentRecipes]);

    useEffect(
        () => () => {
            dispatch(setAllergenDisabled());
            dispatch(clearFilters());
            dispatch(clearSearchInputValue());
        },
        [dispatch],
    );

    const handleLoadMore = () => fetchNextPage();

    return (
        <>
            <PageHeader title={title} subtitle={description} isFetching={isFetching} />

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
                        <LoadMoreButton onLoadMoreClick={handleLoadMore} isLoading={isFetching} />
                    )}
                </TabPanels>
            </Tabs>

            <Loader isLoading={isLoading} />
        </>
    );
});
