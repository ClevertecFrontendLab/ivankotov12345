import { Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';
import { memo, useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router';

import { CardsWrapper } from '~/components/cards-wrapper';
import { FoodCard } from '~/components/food-card';
import { LoadMoreButton } from '~/components/load-more-button';
import { Loader } from '~/components/loader';
import { PageHeader } from '~/components/page-header';
import { getQueryParams } from '~/components/search-panel/helpers/get-query-params';
import { STYLE_VARIANTS } from '~/constants/styles/style-variants';
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

export const TabsSection: React.FC = memo(() => {
    const [isLoadMoreActive, setIsLoadMoreActive] = useState(true);
    const { secondItemPath, thirdItemPath } = usePathItems();
    const dispatch = useAppDispatch();

    const categories = useAppSelector(selectCategories);
    const filters = useAppSelector(selectFilter);
    const { searchInputValue = '' } = useAppSelector(selectSearchInput);
    const isFiltered = useAppSelector(selectIsFiltered);

    const queryParams = useMemo(
        () => getQueryParams(filters, searchInputValue),
        [filters, searchInputValue],
    );

    const tabs = useMemo(
        () => categories.find((item) => item.category === secondItemPath)?.subCategories || [],
        [secondItemPath, categories],
    );

    const activeTab = useMemo(
        () => tabs.find((tab) => tab.category === thirdItemPath),
        [thirdItemPath, tabs],
    );

    const currentCategory = useMemo(
        () => categories.find(({ _id }) => _id === activeTab?.rootCategoryId),
        [activeTab?.rootCategoryId, categories],
    );

    const activeIndex = useMemo(
        () => tabs.findIndex((tab) => tab.category === thirdItemPath),
        [thirdItemPath, tabs],
    );

    const categoryEndpoint = useMemo(() => {
        if (isFiltered) return Endpoints.RECIPE;
        return activeTab?._id
            ? `${Endpoints.RECIPES_BY_CATEGORY}/${activeTab._id}`
            : Endpoints.RECIPE;
    }, [isFiltered, activeTab?._id]);

    const categoryIds = useMemo(() => {
        const category = categories.find(({ category }) => category === secondItemPath);
        return category?.subCategories.map(({ _id }) => _id).join(',') || '';
    }, [secondItemPath, categories]);

    const { isFetching, data, fetchNextPage } = useGetRecipesInfiniteQuery({
        endpoint: categoryEndpoint,
        ...queryParams,
        subcategoriesIds: isFiltered ? categoryIds : undefined,
    });

    const currentRecipes = useMemo(
        () => data?.pages.flatMap((page) => page.data || []).filter(Boolean) || [],
        [data],
    );

    useEffect(() => {
        const totalRecipes = data?.pages[0]?.meta?.total || 0;
        setIsLoadMoreActive(currentRecipes.length < totalRecipes);
    }, [currentRecipes, data?.pages]);

    useEffect(() => {
        if (isFiltered && currentRecipes.length > 0) {
            dispatch(setFilteredRecipes(currentRecipes));
        }
    }, [isFiltered, currentRecipes, dispatch]);

    useEffect(
        () => () => {
            dispatch(setAllergenDisabled());
            dispatch(clearFilters());
            dispatch(clearSearchInputValue());
        },
        [dispatch],
    );

    const handleLoadMore = () => fetchNextPage();

    if (!currentCategory) {
        return <Loader isLoading />;
    }

    return (
        <>
            <PageHeader
                title={currentCategory.title}
                subtitle={currentCategory.description}
                isFetching={isFetching}
            />

            <Tabs as='section' mb={10} index={activeIndex} variant={STYLE_VARIANTS.limeTabs}>
                <TabList>
                    {tabs.map(({ title, category }, index) => (
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
                        {currentRecipes.map((recipe, index) => (
                            <FoodCard key={recipe._id} index={index} {...recipe} />
                        ))}
                    </CardsWrapper>

                    {isLoadMoreActive && (
                        <LoadMoreButton onLoadMoreClick={handleLoadMore} isLoading={isFetching} />
                    )}
                </TabPanels>
            </Tabs>

            <Loader isLoading={isFetching} />
        </>
    );
});
