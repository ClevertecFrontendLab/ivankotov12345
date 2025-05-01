import { Box, Flex, Heading, Spacer } from '@chakra-ui/react';
import { useMemo } from 'react';

import { CardsWrapper } from '~/components/cards-wrapper';
import { FoodCard } from '~/components/food-card';
import { PAGE_TITLES } from '~/constants/page-titles';
import { JUICIEST_SECTION_QUERY_PARAMS } from '~/constants/query-params';
import { DATA_TEST_ID } from '~/constants/test-id';
import { useGetRecipesInfiniteQuery } from '~/query/services/recipe';

import { JuiciestButton } from './juiciest-button';

const { title } = PAGE_TITLES.juiciest;

export const JuiciestSection: React.FC = () => {
    const { data } = useGetRecipesInfiniteQuery(JUICIEST_SECTION_QUERY_PARAMS);

    const juiciestCardData = useMemo(() => data?.pages[0].data || [], [data]);
    return (
        <Box as='section' mb={{ base: 8, lg: 10 }}>
            <Flex alignItems='center' mb={{ base: 4, '2xl': 6 }}>
                <Heading variant='section'>{title}</Heading>

                <Spacer />

                <Box display={{ base: 'none', lg: 'block' }}>
                    <JuiciestButton testId={DATA_TEST_ID.juiciestLink} />
                </Box>
            </Flex>

            <CardsWrapper>
                {juiciestCardData.map((props, index) => (
                    <FoodCard key={props._id} {...props} index={index} />
                ))}
            </CardsWrapper>

            <Flex justifyContent='center' pt={4} display={{ base: 'flex', lg: 'none' }}>
                <JuiciestButton testId={DATA_TEST_ID.juiciestLinkMobile} />
            </Flex>
        </Box>
    );
};
