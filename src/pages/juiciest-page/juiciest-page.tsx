import { Box } from '@chakra-ui/react';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router';

import { CardsWrapper } from '~/components/cards-wrapper';
import { FoodCard } from '~/components/food-card';
import { LoadMoreButton } from '~/components/load-more-button';
import { Loader } from '~/components/loader';
import { PageHeader } from '~/components/page-header';
import { RelevantSection } from '~/components/relevant-section';
import { getQueryParams } from '~/components/search-panel/helpers/get-query-params';
import { PAGE_TITLES } from '~/constants/page-titles';
import { JUICIEST_QUERY_PARAMS } from '~/constants/query-params';
import { ROUTER_PATHS } from '~/constants/router-paths';
import { Endpoints } from '~/query/constants/paths';
import { useGetRecipesInfiniteQuery } from '~/query/services/recipe';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setAllergenDisabled } from '~/store/slices/allergens-slice';
import { selectApp } from '~/store/slices/app-slice';
import { clearFilters, selectFilter } from '~/store/slices/filters-slice';
import { clearSearchInputValue, selectSearchInput } from '~/store/slices/search-input-slice';

const { title: juiciestPageTitle } = PAGE_TITLES.juiciest;

export const JuiciestPage: React.FC = memo(() => {
    const [isLoadMoreActive, setIsLoadMoreActive] = useState(true);
    const { isLoading } = useAppSelector(selectApp);

    const { ...filters } = useAppSelector(selectFilter);
    const { searchInputValue } = useAppSelector(selectSearchInput);

    const dispatch = useAppDispatch();

    const queryParams = useMemo(
        () => getQueryParams(filters, searchInputValue),
        [filters, searchInputValue],
    );

    const { isFetching, data, fetchNextPage, error } = useGetRecipesInfiniteQuery({
        endpoint: Endpoints.RECIPE,
        ...queryParams,
        ...JUICIEST_QUERY_PARAMS,
    });

    const currentRecipes = useMemo(() => data?.pages.map((element) => element.data).flat(), [data]);

    const handleLoadMore = () => fetchNextPage();

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

        if (currentRecipes && metaTotalRecipes && currentRecipes.length >= metaTotalRecipes) {
            setIsLoadMoreActive(false);
        }
    }, [currentRecipes, data]);

    if (error) {
        return <Navigate to={ROUTER_PATHS.homePage} />;
    }

    return (
        <Box>
            <PageHeader title={juiciestPageTitle} isFetching={isFetching} />

            <Box mb={10}>
                <CardsWrapper>
                    {currentRecipes &&
                        currentRecipes.map((props, index) => (
                            <FoodCard key={props._id} {...props} index={index} />
                        ))}
                </CardsWrapper>

                {isLoadMoreActive && (
                    <LoadMoreButton onLoadMoreClick={handleLoadMore} isLoading={isFetching} />
                )}
            </Box>

            <RelevantSection />
            <Loader isLoading={isFetching || isLoading} />
        </Box>
    );
});
