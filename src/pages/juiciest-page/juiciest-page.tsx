import { Box, Button, Center } from '@chakra-ui/react';
import React, { useMemo } from 'react';

import { CardsWrapper } from '~/components/cards-wrapper';
import { FoodCard } from '~/components/food-card';
import { PageHeader } from '~/components/page-header';
import { RelevantSection } from '~/components/relevant-section';
import { getQueryParams } from '~/components/search-panel/helpers/get-query-params';
import { COLORS_LIME } from '~/constants/colors';
import { PAGE_TITLES } from '~/constants/page-titles';
import { JUICIEST_QUERY_PARAMS } from '~/constants/query-params';
import { Endpoints } from '~/query/constants/paths';
import { useGetRecipesInfiniteQuery } from '~/query/services/recipe';
import { useAppSelector } from '~/store/hooks';
import { selectFilter } from '~/store/slices/filters-slice';
import { selectSearchInput } from '~/store/slices/search-input-slice';

const { title: juiciestPageTitle } = PAGE_TITLES.juiciest;

export const JuiciestPage: React.FC = () => {
    const { ...filters } = useAppSelector(selectFilter);
    const { searchInputValue } = useAppSelector(selectSearchInput);

    const queryParams = useMemo(
        () => getQueryParams(filters, searchInputValue),
        [filters, searchInputValue],
    );

    const { data, fetchNextPage } = useGetRecipesInfiniteQuery({
        endpoint: Endpoints.RECIPE,
        ...queryParams,
        ...JUICIEST_QUERY_PARAMS,
    });

    const currentRecipes = useMemo(() => data?.pages.map((element) => element.data).flat(), [data]);

    const handleLoadMore = () => fetchNextPage();
    return (
        <Box>
            <PageHeader title={juiciestPageTitle} />

            <Box mb={10}>
                <CardsWrapper>
                    {currentRecipes &&
                        currentRecipes.map((props, index) => (
                            <FoodCard key={props._id} {...props} index={index} />
                        ))}
                </CardsWrapper>

                <Center mt={4}>
                    <Button bg={COLORS_LIME[400]} px={5} onClick={handleLoadMore}>
                        Загрузить ещё
                    </Button>
                </Center>
            </Box>

            <RelevantSection />
        </Box>
    );
};
