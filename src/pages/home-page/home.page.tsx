import { Box } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import { CardsWrapper } from '~/components/cards-wrapper';
import { Сarousel } from '~/components/carousel';
import { FoodCard } from '~/components/food-card';
import { LoadMoreButton } from '~/components/load-more-button';
import { Loader } from '~/components/loader';
import { PageHeader } from '~/components/page-header';
import { RelevantSection } from '~/components/relevant-section';
import { getQueryParams } from '~/components/search-panel/helpers/get-query-params';
import { PAGE_TITLES } from '~/constants/page-titles';
import { BlogSection } from '~/pages/home-page/components/blog-section';
import { Endpoints } from '~/query/constants/paths';
import { useGetRecipesInfiniteQuery } from '~/query/services/recipe';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setAllergenDisabled } from '~/store/slices/allergens-slice';
import { selectApp } from '~/store/slices/app-slice';
import { clearFilters, selectFilter, selectIsFiltered } from '~/store/slices/filters-slice';
import { selectRecipes, setFilteredRecipes } from '~/store/slices/recipe-slice';
import { clearSearchInputValue, selectSearchInput } from '~/store/slices/search-input-slice';

import { JuiciestSection } from './components/juiciest-section';

const { title: homePageTitle } = PAGE_TITLES.home;

export const HomePage: React.FC = () => {
    const [isLoadMoreActive, setIsLoadMoreActive] = useState(true);
    const isFiltered = useAppSelector(selectIsFiltered);
    const { filteredRecipes } = useAppSelector(selectRecipes);
    const { ...filters } = useAppSelector(selectFilter);
    const { searchInputValue } = useAppSelector(selectSearchInput);
    const { isLoading } = useAppSelector(selectApp);

    const dispatch = useAppDispatch();

    const queryParams = useMemo(
        () => getQueryParams(filters, searchInputValue),
        [filters, searchInputValue],
    );

    const { isFetching, data, fetchNextPage } = useGetRecipesInfiniteQuery(
        { endpoint: Endpoints.RECIPE, ...queryParams },
        { skip: !isFiltered },
    );

    useEffect(() => {
        const currentRecipes = data?.pages.map((element) => element.data).flat();
        if (isFiltered && currentRecipes) {
            dispatch(setFilteredRecipes(currentRecipes));
        }
    }, [data, isFiltered, dispatch]);

    useEffect(
        () => () => {
            dispatch(setAllergenDisabled());
            dispatch(clearFilters());
            dispatch(clearSearchInputValue());
        },
        [dispatch],
    );

    useEffect(() => {
        const metaTotalRecipes = data?.pages[0].meta.total;

        if (filteredRecipes && metaTotalRecipes && filteredRecipes.length >= metaTotalRecipes) {
            setIsLoadMoreActive(false);
        }
    }, [filteredRecipes, data]);

    const handleLoadMore = () => fetchNextPage();

    return (
        <Box>
            <PageHeader title={homePageTitle} isFetching={isFetching} />

            {filteredRecipes.length === 0 ? (
                <>
                    <Сarousel />
                    <JuiciestSection />
                    <BlogSection />
                    <RelevantSection />
                </>
            ) : (
                <>
                    <CardsWrapper>
                        {filteredRecipes &&
                            filteredRecipes.map((card, index) => (
                                <FoodCard key={card._id} {...card} index={index} />
                            ))}
                    </CardsWrapper>

                    {isLoadMoreActive && (
                        <LoadMoreButton onLoadMoreClick={handleLoadMore} isLoading={isFetching} />
                    )}
                </>
            )}

            <Loader isLoading={isLoading} />
        </Box>
    );
};
